import { IBaseCustomRepository } from "src/common/db/customBaseRepository/interfaces/BaseCustomRepository.interface";
import { CreateReportDto} from "../dtos/report.dto";
import { Report } from "../entities/report.entity";


export interface IReportRepository extends IBaseCustomRepository<Report>{

    getReport(): Promise<Report[]>

    createReport(data : CreateReportDto) : Promise<Report>

    getReportById(id:string) : Promise<Report>
}