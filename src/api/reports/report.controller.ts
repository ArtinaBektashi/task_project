import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Put,
  } from '@nestjs/common';
  import { RolesGuard } from '../../common/guards/roles.guard';
  import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { ReportService } from './report.service';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dtos/report.dto';

@UseGuards(new RolesGuard())
@ApiTags('report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}


    @Public()
    @Get()
    async getProject(): Promise<Report[]> {
        return await this.reportService.getReport();
    }

    @Public()
    @Post()
    async create(@Body() data: CreateReportDto) {
      return await this.reportService.createReport(data);
    }

    @Public()
    @Get(':id')
    async getReportById(@Param('id') id : string) : Promise<Report>{
      return await this.reportService.getReportById(id);
    }

    @Public()
    @Post('/add/:reportId/:projectId')
    assignProjectToReport(
    @Param('reportId') reportId: string,
    @Param('projectId') projectId: string,
    ) {
    return this.reportService.assignProjectToReport(reportId, projectId);
    }

    @Public()
    @Post('/:reportId/:userId')
    assignUserToReport(
      @Param('reportId') reportId: string,
      @Param('userId') userId: string,
    ) {
      return this.reportService.assignUserToReport(reportId, userId);
    }

}
