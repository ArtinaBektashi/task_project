import 'dotenv/config';
import { Media } from 'src/api/media/entities/media.entity';
import { Project } from 'src/api/projects/entities/project.entity';
import { Report } from 'src/api/reports/entities/report.entity';
import { Role } from 'src/api/role/entities/role.entity';
import { Task } from 'src/api/task/entities/task.entity';
import { PasswordReset } from 'src/api/user/entities/reset-password.entity';
import { User } from 'src/api/user/entities/user.entity';

export const config = {
  name: 'default',
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT || 5432,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_NAME,
  synchronize: true,
  dropSchema: false,
  entities: [User,PasswordReset,Project,Role,Report,Task,Media],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  logging: process.env.NODE_ENV === 'localhost',
  seeds: [User,Role],
};

export const configNoEntities = {
  name: 'default',
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT || 5432,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASSWORD,
  entities: [User,PasswordReset,Project,Role,Report,Task,Media],
  database: process.env.TYPEORM_NAME,
  migrations: [process.env.TYPEORM_MIGRATIONS],
  logging: process.env.NODE_ENV === 'localhost',
  seeds:[User,Role],
};
