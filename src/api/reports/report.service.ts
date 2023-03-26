import { Injectable } from "@nestjs/common/decorators";
import { createReadStream } from "fs";
import { Readable } from "stream";
import { promisify } from "util";
import { ProjectService } from "../projects/project.service";
import { UserService } from "../user/user.service";
import { CreateReportDto } from "./dtos/report.dto";
import { Report } from "./entities/report.entity";
import { ReportRepository } from "./repository/report.repository";
import { create as createPDF } from 'html-pdf';
import * as ExcelJS from 'exceljs'


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

      async assignProjectToReport(data: { reportId: string, projectId: string }) {
        const { reportId, projectId } = data;
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

      async assignUserToReport(data: {reportId: string, userId: string}): Promise<Report> {
        const { reportId, userId } = data;
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
    
      async findByProjectId(projectId: string): Promise<Report[]> {
        return await this.reportRepository.createQueryBuilder('report')
        .leftJoinAndSelect('report.project', 'project')
        .where('project.uuid = :projectId', { projectId })
        .getMany();
    }

    async findByUserId(userId: string) : Promise<Report[]>{
        return await this.reportRepository.createQueryBuilder('report')
        .leftJoinAndSelect('report.user','user')
        .where('user.uuid = :userId', {userId})
        .getMany()
    }

    async downloadReportPdf(id: string): Promise<{ fileName: string; stream: Readable }> {
        const report = await this.getReportById(id);
        const html = `
          <html>
            <head>
              <meta charset="utf-8">
              <title>${report.name}</title>
            </head>
            <body>
              <h1>${report.name}</h1>
              <p>Report ID: ${report.uuid}</p>
              <p>Report Project : ${report.project}</p>
              <p>Report User : ${report.user}</p>
              <p>Date of creation : ${report.created_at}</p>
            </body>
          </html>
        `;
        const options = {
          format: 'Letter',
        };
        const pdf = await promisify(createPDF)(html, options);
        const fileName = `${report.name}.pdf`;
        const stream = createReadStream(pdf.filename);
        return { fileName, stream };
      }

      async downloadReportExcel(id: string): Promise<{ fileName: string; stream: Readable }> {
        const report = await this.getReportById(id);
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Report');
    
        worksheet.columns = [
          { header: 'Name', key: 'name', width: 20 },
          { header: 'ID', key: 'id', width: 10 },
          { header: 'Project', key: 'project', width: 20 },
          { header: 'Date of Creation', key: 'createdAt', width: 20 },
        ];
    
        worksheet.addRow({
          name: report.name,
          id: report.uuid,
          project: report.project ? report.project.name : '',
          createdAt: report.created_at,
        });
    
        const buffer = await workbook.xlsx.writeBuffer();
        const fileName = `${report.name}.xlsx`;
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);
    
        return { fileName, stream };
      }
}