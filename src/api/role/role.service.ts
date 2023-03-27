import slugify from 'slugify';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { Role } from './entities/role.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(data: CreateRoleDto): Promise<any> {
    const slufigiedName = slugify(data.name);

    const roleExists = await this.getRoleBySlug(data.name);
    if (roleExists) {
      throw new HttpException('Already exists!', HttpStatus.BAD_REQUEST);
    }

    const role = await this.roleRepository.create({
      name: data.name,
      slug: slufigiedName,
    });

    await this.roleRepository.save(role);

    return role;
  }

  async findAll() {
    return await this.roleRepository.findAndCount();
  }

  async findOne(id: string) {
    return await this.roleRepository.findBy({ id });
  }

  async update(id: string, data: UpdateRoleDto) {
    await this.roleRepository.update(id, {
      name: data.name,
      slug: slugify(data.name),
    });

    return await this.roleRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  async remove(id: string) {
    await this.getRequestedRoleOrFail(id);
    await this.roleRepository.delete(id);
    return { message: 'Role was deleted successfullty!' };
  }

  public async getRoleBySlug(name: string) {
    return await this.roleRepository.findOne({ where: { name } });
  }

  public async getRequestedRoleOrFail(id: string, options?: any) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) {
      throw new HttpException('Role does not exist!', HttpStatus.NOT_FOUND);
    }

    return role;
  }

  async getAllPermissionsPerRole(id: string) {
    const role = await this.getRequestedRoleOrFail(id, {
      relations: ['permissions'],
    });
    return role;
  }
}