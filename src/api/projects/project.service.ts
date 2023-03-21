import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { UpdateProjectDto } from "./dtos/update-project.dto";
// import { Repository } from "typeorm";
// import { CreateProjectDto } from "./dtos/create-project.dto";
import { Project } from "./entities/project.entity";
import { ProjectRepository } from "./repository/project.repository";
import { UserService } from "../user/user.service";


@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository){}
    // private readonly userService: UserService,) {}

  async getProject(): Promise<Project[]> {
    return await this.projectRepository.getProject();
  }

  async createProject(createProjectDto : CreateProjectDto): Promise<Project>{
    return await this.projectRepository.createProject(createProjectDto);
  }

  async getProjectById(projectId: string) :Promise<Project>{
    return await this.projectRepository.getProjectById(projectId)
  }

  async updateProject(uuid: string, updateProjectDto : UpdateProjectDto) : Promise<Project>{
    return await this.projectRepository.updateProject(uuid,updateProjectDto)
  }

  async removeProject(projectId:string) : Promise<void>{
    return await this.projectRepository.removeProject(projectId);
  }

  // async addUserToProject(  projectId: string,
  //   userId: string[],
  // ): Promise<Project> {
  //   const project = await this.projectRepository.findOne({
  //     where: {
  //       uuid: projectId,
  //     },
  //     relations: ['users'],
  //   });
  //   const users = await this.userService.findUsersByIds(userId);
  //   project.users = [...project.users, ...users];
  //   await this.projectRepository.save(project);
  //   return project;
  // }
}