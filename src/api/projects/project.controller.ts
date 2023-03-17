import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Put,
    UseInterceptors,
  } from '@nestjs/common';
  import { Roles } from '../../common/decorators/roles.decorator';
  import { RolesGuard } from '../../common/guards/roles.guard';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { PaginationInterceptor } from '../../common/interceptors/pagination.interceptor';
  import { UserRoles } from '../user/enums/roles.enum';
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

    // @Public()
    // @Put(':id')
    // async updateProject(@Param('id') id:string , @Body() data:UpdateProjectDto) :Promise<Project>{
    //   return await this.projectService.updateProject(id,data);
    // }

    @Public()
    @Delete(':id')
    async removeProject(@Param('id') id:string) : Promise<void>{
      return await this.projectService.removeProject(id);
    }

    // @Roles(UserRoles.ADMIN)
    // @UseInterceptors(PaginationInterceptor)
    // @Get()
    // async findAll(){
    //     return await this.projectService.findAll();
    // }

    // @Roles(UserRoles.ADMIN)
    // @Get(':projectId')
    // async findOne(@Param('projectId') projectId:string): Promise<Project>{
    //     return await this.projectService.findOne(projectId)
    // }

    // @Roles(UserRoles.ADMIN)
    // @Put(':projectId')
    // async update(@Param('projectId') projectId : string, @Body() data : UpdateProjectDto){
    //     return this.projectService.update(projectId,data)
    // }

    // @Roles(UserRoles.ADMIN)
    // @Delete(':projectId')
    // async remove(@Param('projectId') projectId: string){
    //     return await this.projectService.remove(projectId)
    // }
}