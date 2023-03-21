import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Put,
  } from '@nestjs/common';
  import { RolesGuard } from '../../common/guards/roles.guard';
  import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Public } from 'src/common/decorators/public.decorator';

@UseGuards(new RolesGuard())
@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  //@Roles(UserRoles.ADMIN)
  @Public()
  @Get()
  async getProject(): Promise<Project[]> {
    return await this.projectService.getProject();
  }

  
    // @Roles(UserRoles.ADMIN)
    @Public()
    @Post()
    async create(@Body() data: CreateProjectDto) {
      return await this.projectService.createProject(data);
    }

    @Public()
    @Get(':id')
    async getProjectById(@Param('id') id : string) : Promise<Project>{
      return await this.projectService.getProjectById(id);
    }

    @Public()
    @Put(':id')
    async updateProject(@Param('id') id:string , @Body() data:UpdateProjectDto) :Promise<Project>{
      return await this.projectService.updateProject(id,data);
    }

    @Public()
    @Delete(':id')
    async removeProject(@Param('id') id:string) : Promise<void>{
      return await this.projectService.removeProject(id);
    }

    @Public()
    @Post(':projectId')
    addUserToProject(
      @Param('projectId') projectId: string,
      @Body('userIds') userIds: string[],
    ): Promise<Project> {
      return this.projectService.addUserToProject(projectId,userIds);
    }
}