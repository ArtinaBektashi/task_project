import { BaseCustomRepository } from "src/common/db/customBaseRepository/BaseCustomRepository";
import { CustomRepository } from "src/common/db/decorators/CustomRepository.decorator";
import { Report } from "../entities/report.entity";
import { IReportRepository } from "../interfaces/report.interface";

@CustomRepository(Report)
export class ReportRepository extends BaseCustomRepository<Report> implements IReportRepository{

    getReport():
}

