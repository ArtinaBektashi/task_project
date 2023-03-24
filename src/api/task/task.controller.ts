import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/common/decorators/public.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateTaskDto, UpdateTaskDto } from "./dtos/task.dto";
import { Task } from "./entities/task.entity";
import { TaskService } from "./task.service";

@UseGuards(new RolesGuard())
@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

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
    @Post('/add/:taskId/:userId')
    async addTaskToUser(@Param('taskId') taskId:string, @Param('userId') userId:string){
        return await this.taskService.addTaskToUser(taskId,userId)
    }

    @Public()
    @Post(':taskId/:projectId')
    async addTaskToProject(@Param('taskId') taskId:string, @Param('projectId') projectId:string){
        return await this.taskService.addTaskToProject(taskId,projectId)
    }
}