import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRepository } from './repository/project.repository';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([ProjectRepository]),
    UserModule,
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}