import { BaseCustomRepository } from "src/common/db/customBaseRepository/BaseCustomRepository";
import { CustomRepository } from "src/common/db/decorators/CustomRepository.decorator";
import { Report } from "../entities/report.entity";

@CustomRepository(Report)
export class ReportRepository extends BaseCustomRepository<Report>{

}

