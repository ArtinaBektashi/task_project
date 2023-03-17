import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRepository } from './repository/project.repository';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';

@Module({
  imports: [CustomRepositoryModule.forCustomRepository([ProjectRepository])],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}