import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dtos/task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './repository/task.repository';

@Injectable()
export class TaskService {
    constructor(private readonly taskRepository: TaskRepository){}

    async getTasks():Promise<Task[]>{
        return await this.taskRepository.getTasks()
    }

    async getTaskById(taskId:string):Promise<Task>{
       return await this.taskRepository.getTasksById(taskId)
    }
    async createTask(data:CreateTaskDto):Promise<Task>{
        return await this.taskRepository.createTask(data);
    }
    async updateTask(taskId:string, data:UpdateTaskDto):Promise<Task>{
        return await this.taskRepository.updateTask(taskId,data)
    }
    async removeTask(taskId:string):Promise<void>{
        await this.taskRepository.removeTask(taskId)
    }
}
