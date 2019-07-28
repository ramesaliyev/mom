import { Injectable, ConflictException } from '@nestjs/common';
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

  async findAll(query: any): Promise<Job[]> {
    return await this.jobRepository.find(query);
  }

  async create(userFromToken: UserSafeDTO, jobCreateDTO: JobCreateDTO): Promise<Job> {
    const user = await this.userService.findOneById(userFromToken.id);

    const job = {
      ...jobCreateDTO,
      owner: user,
      done: false
    }

    const creation: any = await this.mqService.rpc('job', {
      type: 'db',
      action: 'job.upsert',
      payload: job,
    });

    if (creation.error) {
      throw new ConflictException(creation.message);
    }

    creation.owner = user.safeResponse();

    await this.mqService.sendToQueue(`job`, creation);

    return creation;
  }
}