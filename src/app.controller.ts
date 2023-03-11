import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private logger: Logger,
  ) {}


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
