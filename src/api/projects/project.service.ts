import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { UpdateProjectDto } from "./dtos/update-project.dto";
// import { Repository } from "typeorm";
// import { CreateProjectDto } from "./dtos/create-project.dto";
import { Project } from "./entities/project.entity";
import { ProjectRepository } from "./repository/project.repository";


@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async getProject(): Promise<Project[]> {
    return await this.projectRepository.getProject();
  }

  async createProject(createProjectDto : CreateProjectDto): Promise<Project>{
    return await this.projectRepository.createProject(createProjectDto);
  }

  async getProjectById(projectId: string) :Promise<Project>{
    return await this.projectRepository.getProjectById(projectId)
  }

  async updateProject(projectId: string, updateProjectDto : UpdateProjectDto) : Promise<Project>{
    return await this.projectRepository.updateProject(projectId,updateProjectDto)
  }

  async removeProject(projectId:string) : Promise<void>{
    return await this.projectRepository.removeProject(projectId);
  }
}