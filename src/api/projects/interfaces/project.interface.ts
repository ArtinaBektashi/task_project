import { IBaseCustomRepository } from 'src/common/db/customBaseRepository/interfaces/BaseCustomRepository.interface';
import { Project } from '../entities/project.entity';


export interface IProjectRepository extends IBaseCustomRepository<Project> {
 

    getProject() : Promise<Project[]>
}