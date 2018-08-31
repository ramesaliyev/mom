import { Post, Controller, UsePipes, ValidationPipe, Body, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'guards/auth.guard';
import { User } from 'decorators/user.decorator';

import { JobCreateDTO } from './job.dto';
import { JobService } from './job.service';
import { Job } from './job.entity';

@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
  ) {}
  
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      whitelist: true,
    }),
  )
  async create(@Body() jobCreateDTO: JobCreateDTO, @User() user): Promise<Job> {
    return await this.jobService.create(user, jobCreateDTO);
  }
}