/* eslint-disable @typescript-eslint/no-empty-interface */
import { IBaseCustomRepository } from 'src/common/db/customBaseRepository/interfaces/BaseCustomRepository.interface';
import { User } from '../entities/user.entity';

export interface IUserRepository extends IBaseCustomRepository<User> {}
