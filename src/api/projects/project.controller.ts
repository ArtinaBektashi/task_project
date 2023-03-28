import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Put,
    Query,
    NotFoundException,
  } from '@nestjs/common';
  import { RolesGuard } from '../../common/guards/roles.guard';
  import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { Project } from './entities/project.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoles } from '../user/enums/roles.enum';

@UseGuards(new RolesGuard())
@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  
    @Roles(UserRoles.ADMIN,UserRoles.DEVELOPER,UserRoles.MANAGER)
    @Get()
    async getProject(): Promise<Project[]> {
      return await this.projectService.getProject();
    }

    @Roles(UserRoles.ADMIN,UserRoles.DEVELOPER,UserRoles.MANAGER)
    @Get('/search')
    async searchProjects(
      @Query('q') searchTerm: string,
      @Query('name') name?: string,
    ): Promise<Project[]> {
      const projects = await this.projectService.searchProjects(searchTerm, { name });
      if (!projects || projects.length === 0) {
        throw new NotFoundException('No projects found');
      }
      return projects;
    }

  
    @Roles(UserRoles.ADMIN, UserRoles.MANAGER)
    @Post()
    async create(@Body() data: CreateProjectDto) {
      return await this.projectService.createProject(data);
    }

    @Roles(UserRoles.ADMIN, UserRoles.DEVELOPER, UserRoles.MANAGER)
    @Get(':id')
    async getProjectById(@Param('id') id : string) : Promise<Project>{
      return await this.projectService.getProjectById(id);
    }

    @Roles(UserRoles.ADMIN, UserRoles.MANAGER)
    @Put(':id')
    async updateProject(@Param('id') id:string , @Body() data:UpdateProjectDto) :Promise<Project>{
      return await this.projectService.updateProject(id,data);
    }

    @Roles(UserRoles.ADMIN, UserRoles.MANAGER)
    @Delete(':id')
    async removeProject(@Param('id') id:string) : Promise<void>{
      return await this.projectService.removeProject(id);
    }

    @Roles(UserRoles.ADMIN, UserRoles.MANAGER)
    @Post(':projectId')
    addUserToProject(
    @Param('projectId') projectId: string,
    @Body('userIds') userIds: string[],
  ): Promise<Project> {
    return this.projectService.assignUsersToProject(projectId, userIds);
  }
}