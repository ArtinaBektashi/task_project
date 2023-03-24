import { Injectable } from '@nestjs/common';
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

     async addTaskToUser(taskId :string, userId: string) : Promise<Task>{
        const user = await this.userService.findOne(userId);
        const task = await this.taskRepository.findOne({
            where:{
                uuid: taskId,
            },
            relations:['user']
        })
        task.user=user;
        await this.taskRepository.save(task)

        return task;
     }

    async addTaskToProject(taskId:string, projectId: string) :Promise<Task>{
        const project= await this.projectService.getProjectById(projectId);
        const task= await this.taskRepository.findOne({
            where:{
                uuid:taskId
            },
            relations:['project']
        })
        task.project = project;
        await this.taskRepository.save(task);
        return task;
    }
}
