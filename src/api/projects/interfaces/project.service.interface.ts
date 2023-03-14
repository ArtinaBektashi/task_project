// remove eslint comment when you start to populate the interface

import { CreateProjectDto } from '../dtos/create-project.dto'; 
import { UpdateProjectDto } from '../dtos/update-project.dto'; 
import { Project } from '../entities/project.entity'; 

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserService {
  create(createProjectDto: CreateProjectDto): Promise<Project>;

  findOne(projectId: string): Promise<Project>;

  findAll(): Promise<Project[]>;

  update(projectId: string, updateProjectDto: UpdateProjectDto): Promise<Project>;

  remove(projectId: string): Promise<void>;

}
