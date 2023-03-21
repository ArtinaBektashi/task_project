import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';
import { TaskRepository } from './repository/task.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([TaskRepository]),
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
