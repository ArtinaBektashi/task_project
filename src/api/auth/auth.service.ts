import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './interfaces/jwt-payload.inteface';
import { Tokens } from './types/tokens.types';
import { jwtConstants } from './constants/constants';
import {
  compareHashedDataArgon,
  compareHashedDataBcrypt,
  hashDataArgon,
  hashDataBrypt,
} from '../../services/providers';
import { IAuthService } from './interfaces/auth.service.interface';
import { RolePermissions, UserRoles } from '../user/enums/roles.enum';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(registerDto: RegisterDTO): Promise<Tokens> {
    registerDto.password = await hashDataBrypt(registerDto.password);
    delete registerDto.passwordConfirm;

    const userRoleKey = UserRoles[registerDto.role];
    const userPermissions = RolePermissions[userRoleKey];

    try {
      const user = await this.userRepository.save(
        this.userRepository.create({
          ...registerDto,
          permissions: userPermissions,
        }),
      );
      const tokens = await this.getTokens(user.uuid);
      await this.updateRtHash(user.uuid, tokens.refreshToken);
      return tokens;
    } catch (error) {
      // throw new HttpException(
      //   'User registration failed',
      //   HttpStatus.BAD_REQUEST,
      // );
      throw new InternalServerErrorException('User registration failed');
    }
  }

  async login(loginDto: LoginDto): Promise<Tokens> {
    const user: User = await this.userRepository.findOneBy({
      email: loginDto.email,
    });
    if (!user) {
      throw new BadRequestException('Wrong credentials!');
    }

    const isMatch = await compareHashedDataBcrypt(
      loginDto.password,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Wrong credentials!');
    }

    const tokens = await this.getTokens(user.uuid);
    await this.updateRtHash(user.uuid, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string): Promise<void> {
    const user: User = await this.validateUser(userId);
    user.hashedRt = null;
    await this.userRepository.save(user);
  }

  async refreshToken(userId: string, rt: string): Promise<Tokens> {
    const user: User = await this.validateUser(userId);
    if (!user || !user.hashedRt) {
      throw new ForbiddenException();
    }

    const rtMatches = await compareHashedDataArgon(rt, user.hashedRt);

    if (!rtMatches) {
      throw new UnauthorizedException();
    }

    const tokens: Tokens = await this.getTokens(user.uuid);
    await this.updateRtHash(user.uuid, tokens.refreshToken);
    return tokens;
  }

  private async validateUser(userId: string): Promise<User> {
    return await this.userRepository.findOneBy({ uuid: userId });
  }

  private async updateRtHash(userId: string, rt: string): Promise<void> {
    const newHashRt = await hashDataArgon(rt);
    const user = await this.validateUser(userId);
    user.hashedRt = newHashRt;
    await this.userRepository.save(user);
  }

  async getTokens(userId: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: userId,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstants.at_secret,
        expiresIn: process.env.AT_TOKEN_EXPIRATION_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstants.rt_secret,
        expiresIn: process.env.RT_TOKEN_EXPIRATION_TIME,
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
