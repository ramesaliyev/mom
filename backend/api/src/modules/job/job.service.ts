import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
  ) {}

  async create(userFromToken: UserSafeDTO, jobCreateDTO: JobCreateDTO): Promise<Job> {
    const user = await this.userService.findOneById(userFromToken.id);

    const JobRecord = new Job();
    JobRecord.owner = user;
    JobRecord.done = false;
    JobRecord.type = jobCreateDTO.type;
    JobRecord.details = jobCreateDTO.details;

    const record = await this.jobRepository.save(JobRecord);
    record.owner = user.safeResponse();

    return record;
  }
}