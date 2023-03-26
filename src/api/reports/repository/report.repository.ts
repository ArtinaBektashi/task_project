import { UnprocessableEntityException } from "@nestjs/common";
import { BaseCustomRepository } from "src/common/db/customBaseRepository/BaseCustomRepository";
import { CustomRepository } from "src/common/db/decorators/CustomRepository.decorator";
import { CreateReportDto, UpdateReportDto } from "../dtos/report.dto";
import { Report } from "../entities/report.entity";
import { IReportRepository } from "../interfaces/report.interface";

@CustomRepository(Report)
export class ReportRepository extends BaseCustomRepository<Report> 
    implements IReportRepository{

    async getReport(): Promise<Report[]>{
        return await this.find()
    }

    async createReport(data : CreateReportDto) : Promise<Report>{
        const report = this.create(data);
        await this.save(report);
    
        return report
      }

    async getReportById(id: string): Promise<Report> {
        const report = await this.findOneBy({uuid: id});
        if(!report){
            throw new UnprocessableEntityException('This report does not exist!');
        }
        return report;
    }
    
}

