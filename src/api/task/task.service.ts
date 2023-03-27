import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { ProjectService } from '../projects/project.service';
import { UserService } from '../user/user.service';
import { CreateTaskDto, UpdateTaskDto } from './dtos/task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './repository/task.repository';

@Injectable()
export class TaskService {
    constructor(private readonly taskRepository: TaskRepository,
        private readonly userService: UserService,
        private readonly projectService: ProjectService){}


    async getTasks():Promise<Task[]>{
    const tasks = await this.taskRepository.getTasks()

        if(!tasks || tasks.length === 0){
            throw new NotFoundException('No tasks found');
        }

      return tasks;
    }


    async getTaskById(taskId:string):Promise<Task>{
        try {
            const task = await this.taskRepository.getTasksById(taskId);
            if (!task) {
                throw new NotFoundException('Task not found');
            }
            return task;
        } catch (error) {
            if(error instanceof QueryFailedError){
            throw new NotFoundException('Task not found');
            }
            throw error;
        }
    }


    async createTask(data:CreateTaskDto):Promise<Task>{
        const taskExists = await this.taskRepository.findOneBy({
            name: data.name,
          });
          if (taskExists) {
            throw new ConflictException(
              `A task with name ${data.name} already exists`,
            );
          }
          return await this.taskRepository.createTask(data);
    }


    async updateTask(taskId:string, data:UpdateTaskDto):Promise<Task>{
        const task = await this.getTaskById(taskId)
        
            if (!task) {
                throw new NotFoundException('Task not found');
            }

        return await this.taskRepository.updateTask(taskId,data)
    }


    async removeTask(taskId:string):Promise<void>{
        const task = await this.getTaskById(taskId)
        
           if (!task) {
               throw new NotFoundException('Task not found');
           }

        await this.taskRepository.removeTask(taskId)
    }


     async addTaskToUser(taskId :string, userId: string) : Promise<Task>{
        const user = await this.userService.findOne(userId);

            if(!user) {
                throw new NotFoundException('User not found');
            }

        const task = await this.taskRepository.findOne({
            where:{
                uuid: taskId,
            },
            relations:['user']
        })

           if (!task) {
               throw new NotFoundException('Task not found');
           }

        task.user=user;
        await this.taskRepository.save(task)

        return task;
     }


    async addTaskToProject(taskId:string, projectId: string) :Promise<Task>{
        const project= await this.projectService.getProjectById(projectId);

            if(!project) {
                throw new NotFoundException('Project not found');
            }

        const task= await this.taskRepository.findOne({
            where:{
                uuid:taskId
            },
            relations:['project']
        })

           if (!task) {
               throw new NotFoundException('Task not found');
           } 

        task.project = project;
        await this.taskRepository.save(task);
        return task;
    }
    
}
