import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { In } from 'typeorm';
import AppDataSource from '../../dataSource/data-source.initialize';
import { Role } from '../../../../api/role/entities/role.entity';

@Injectable()
export class RolesSeeder implements Seeder {
  async seed(): Promise<any> {
    const roleRepository = AppDataSource.getRepository(Role);

    const users = roleRepository.create([
      {
        name: 'Admin',
        slug: 'admin',
      },
      {
        name: 'Manager',
        slug: 'manager',
      },
      {
        name: 'Developer',
        slug: 'developer',
      },
    ]);
    await roleRepository.save(users);
  }

  async drop(): Promise<any> {
    const roleRepository = AppDataSource.getRepository(Role);
    const slug = ['admin', 'developer', 'manager'];
    await roleRepository.delete({ slug: In(slug) });
  }
}