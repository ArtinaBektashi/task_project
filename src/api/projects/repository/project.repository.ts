import { UnprocessableEntityException } from '@nestjs/common';
import { BaseCustomRepository } from '../../../common/db/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from '../../../common/db/decorators/CustomRepository.decorator';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { Project } from '../entities/project.entity';
import { IProjectRepository } from '../interfaces/project.interface';


@CustomRepository(Project)
export class ProjectRepository
  extends BaseCustomRepository<Project>
  implements IProjectRepository
{
  async getProject(): Promise<Project[]> {
    return await this.find();
  }

  async createProject(createProjectDto : CreateProjectDto) : Promise<Project>{
    const project = this.create(createProjectDto);
    await this.save(project);

    return project
  }

  async getProjectById(projectId:string):Promise<Project>{
    const project = await this.findOneBy({uuid : projectId})
         if (!project) {
        throw new UnprocessableEntityException('This project does not exist!');
        }
        return project;
  }


  async updateProject(id:string, updateProjectDto : UpdateProjectDto) : Promise<Project>{
    const project = await this.findOneBy({uuid : id})
    if (!project) {
        throw new UnprocessableEntityException('This project does not exist!');
    }
    await this.update(project.uuid, updateProjectDto);
    return this.getProjectById(id);
  }

  async removeProject(projectId: string): Promise<void> {
    const project = await this.findOneBy({uuid:projectId})
    await this.delete(project.id);
  }
}