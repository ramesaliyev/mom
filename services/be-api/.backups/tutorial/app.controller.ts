import {
  Get,
  Controller,
  HttpException,
  HttpStatus,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './decorators/user.decorator';
import { HttpExceptionFilter } from './filters/http-exception';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Controller()
@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    if (Math.random() > 0.5) {
      throw new HttpException('FuckYou', HttpStatus.FORBIDDEN);
    }

    return this.appService.root();
  }

  @Get('user/:id')
  findOne(@User() userInfo) {
    return userInfo;
  }
}
