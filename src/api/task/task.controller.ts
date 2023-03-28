import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Req } from "@nestjs/common/decorators";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { Public } from "src/common/decorators/public.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateTaskDto, UpdateTaskDto } from "./dtos/task.dto";
import { Task } from "./entities/task.entity";
import { TaskRepository } from "./repository/task.repository";
import { TaskService } from "./task.service";

@UseGuards(new RolesGuard())
@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService, private readonly taskRepository : TaskRepository) {}

  //@Roles(UserRoles.ADMIN)
  @Public()
  @Get()
  async getTasks(): Promise<Task[]> {
    return await this.taskService.getTasks();
  }

  
    // @Roles(UserRoles.ADMIN)
    @Public()
    @Post()
    async createTask(@Body() data: CreateTaskDto) {
      return await this.taskService.createTask(data);
    }

    @Public()
    @Get(':id')
    async getTaskById(@Param('id') id : string) : Promise<Task>{
      return await this.taskService.getTaskById(id);
    }

    @Public()
    @Put(':id')
    async updateTask(@Param('id') id:string , @Body() data:UpdateTaskDto) :Promise<Task>{
      return await this.taskService.updateTask(id,data);
    }

    @Public()
    @Delete(':id')
    async removeTask(@Param('id') id:string) : Promise<void>{
      return await this.taskService.removeTask(id);
    }

    @Public()
    @Post('/addTaskToUser')
    async addTaskToUser(@Body() data: {taskId:string, userId:string}):Promise<Task>{
        return await this.taskService.addTaskToUser(data)
    }

    @Public()
    @Post('/addTaskToProject')
    async addTaskToProject(@Body() data: {taskId:string, projectId:string}){
        return await this.taskService.addTaskToProject(data)
    }

    @Public()
    @Get('filtered')
    async filtered(@Req() req:Request){
      const builder = await this.taskRepository.createQueryBuilder('task');

      if(req.query.s){
        builder.where("task.name LIKE :s OR task.description LIKE :s",{s: `%${req.query.s}%`})
      }
      return await builder.getMany()
    }
}