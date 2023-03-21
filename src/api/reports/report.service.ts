import { Injectable } from "@nestjs/common/decorators";
import { ProjectService } from "../projects/project.service";
import { ProjectRepository } from "../projects/repository/project.repository";
import { UserService } from "../user/user.service";
import { CreateReportDto } from "./dtos/report.dto";
import { Report } from "./entities/report.entity";
import { ReportRepository } from "./repository/report.repository";


@Injectable()
export class ReportService{
    constructor(private readonly reportRepository: ReportRepository,
        private readonly projectService: ProjectService,
        private readonly userService : UserService) {}

    async getReport() :Promise<Report[]>{
        return await this.reportRepository.getReport();
    }


    async getReportById(id:string) : Promise<Report>{
        return await this.reportRepository.getReportById(id);
    }

    async createReport(data : CreateReportDto) : Promise<Report>{
        return await this.reportRepository.createReport(data);
      }

      async assignProjectToReport(reportId: string, projectId: string) {
        const project = await this.projectService.getProjectById(projectId);
        const report = await this.reportRepository.findOne({
          where: {
            uuid: reportId,
          },
          relations: ['project'],
        });
        report.project = project;
        await this.reportRepository.save(report);
        return report;
      }

      async assignUserToReport(reportId: string, userId: string): Promise<Report> {
        const user = await this.userService.findOne(userId);
        const report = await this.reportRepository.findOne({
          where: {
            uuid: reportId,
          },
          relations: ['user'],
        });
        report.user = user;
    
        await this.reportRepository.save(report);
    
        return report;
      }
}