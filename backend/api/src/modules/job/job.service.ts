import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MQService } from 'core/services/mq.service';

import { UserSafeDTO } from 'modules/user/user.dto';
import { UserService } from 'modules/user/user.service';

import { Job } from './job.entity';
import { JobCreateDTO } from './job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    private readonly userService: UserService,
    private readonly mqService: MQService,
  ) {}

  async create(userFromToken: UserSafeDTO, jobCreateDTO: JobCreateDTO): Promise<Job> {
    const user = await this.userService.findOneById(userFromToken.id);

    const { type, details } = jobCreateDTO;

    const JobRecord = new Job();
    JobRecord.owner = user;
    JobRecord.done = false;
    JobRecord.type = type;
    JobRecord.details = details;

    const record = await this.jobRepository.save(JobRecord);
    record.owner = user.safeResponse();

    await this.mqService.queue(`job:${type}`, JobRecord);

    return record;
  }
}