import { Tokens } from '../types/tokens.types';
import { RegisterDTO } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';

export interface IAuthController {
  register: (body: RegisterDTO) => Promise<Tokens>;
  login: (body: LoginDto) => Promise<Tokens>;
  logout: (user: string) => Promise<void>;
  refreshToken: (user: string, refreshToken: string) => Promise<Tokens>;
}
