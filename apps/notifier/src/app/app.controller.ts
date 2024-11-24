import { Controller, forwardRef, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(@Inject(forwardRef(() => AppService)) private readonly appService: AppService) {}

  @Get('/hello')
  getData() {
    return this.appService.getData();
  }
}
