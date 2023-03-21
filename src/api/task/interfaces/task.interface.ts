import { IBaseCustomRepository } from "src/common/db/customBaseRepository/interfaces/BaseCustomRepository.interface";
import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";
import { Task } from "../entities/task.entity";


export interface ITaskRepository extends IBaseCustomRepository<Task>{
    
    getTasks():Promise<Task[]>

    createTask(data: CreateTaskDto):Promise<Task>

    getTasksById(taskId: string ):Promise<Task>

    updateTask(taskId:string , data:UpdateTaskDto): Promise<Task>

    removeTask(taskId:string) :Promise<void>
}