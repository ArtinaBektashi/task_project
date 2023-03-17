import { Module } from "@nestjs/common";
import { CustomRepositoryModule } from "src/common/db/CustomRepository.module";
import { CustomRepository } from "src/common/db/decorators/CustomRepository.decorator";
import { ReportRepository } from "./repository/report.repository";


@Module({
    imports:[CustomRepositoryModule.forCustomRepository([ReportRepository])],

})

export class ReportModule{}
