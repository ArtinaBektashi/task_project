import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Req } from "@nestjs/common/decorators";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { Public } from "src/common/decorators/public.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { UserRoles } from "../user/enums/roles.enum";
import { CreateTaskDto, UpdateTaskDto } from "./dtos/task.dto";
import { Task } from "./entities/task.entity";
import { TaskRepository } from "./repository/task.repository";
import { TaskService } from "./task.service";

@UseGuards(new RolesGuard())
@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService, private readonly taskRepository : TaskRepository) {}

  @Roles(UserRoles.ADMIN,UserRoles.MANAGER,UserRoles.DEVELOPER)
  @Get()
  async getTasks(): Promise<Task[]> {
    return await this.taskService.getTasks();
  }

  
    @Roles(UserRoles.MANAGER)
    @Post()
    async createTask(@Body() data: CreateTaskDto) {
      return await this.taskService.createTask(data);
    }

    @Roles(UserRoles.ADMIN,UserRoles.MANAGER,UserRoles.DEVELOPER)
    @Get(':id')
    async getTaskById(@Param('id') id : string) : Promise<Task>{
      return await this.taskService.getTaskById(id);
    }

    @Roles(UserRoles.MANAGER)
    @Put(':id')
    async updateTask(@Param('id') id:string , @Body() data:UpdateTaskDto) :Promise<Task>{
      return await this.taskService.updateTask(id,data);
    }

    @Roles(UserRoles.MANAGER)
    @Delete(':id')
    async removeTask(@Param('id') id:string) : Promise<void>{
      return await this.taskService.removeTask(id);
    }

    @Roles(UserRoles.MANAGER)
    @Post('/addTaskToUser')
    async addTaskToUser(@Body() data: {taskId:string, userId:string}):Promise<Task>{
        return await this.taskService.addTaskToUser(data)
    }

    @Roles(UserRoles.MANAGER)
    @Post('/addTaskToProject')
    async addTaskToProject(@Body() data: {taskId:string, projectId:string}){
        return await this.taskService.addTaskToProject(data)
    }
}