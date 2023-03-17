import { IBaseCustomRepository } from 'src/common/db/customBaseRepository/interfaces/BaseCustomRepository.interface';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { Project } from '../entities/project.entity';


export interface IProjectRepository extends IBaseCustomRepository<Project> {
 

    getProject() : Promise<Project[]>

    createProject(data: CreateProjectDto) : Promise<Project>

    getProjectById(projectId:string):Promise<Project>

    removeProject(projectId: string): Promise<void> 
}