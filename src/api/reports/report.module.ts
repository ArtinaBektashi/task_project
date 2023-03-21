import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { CustomRepositoryModule } from '../../common/db/CustomRepository.module';
import { ReportRepository } from './repository/report.repository';
import { ProjectModule } from '../projects/project.module';
import { ProjectRepository } from '../projects/repository/project.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([ReportRepository]),
    ProjectModule,
    UserModule
  ],
  controllers: [ReportController],
  providers: [ReportService , ProjectRepository],
})
export class ReportModule {}
