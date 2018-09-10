import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MQService } from 'core/services/mq.service';

import { User } from './user.entity';
import { UserRegisterDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mqService: MQService,
  ) {}

  async findOneBy(by: any): Promise<User> {
    return await this.userRepository.findOne(by);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.findOneBy({ email });
  }

  async findOneById(id: number): Promise<User> {
    return await this.findOneBy({ id });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ cache : true }); // caching to redis example
  }

  async create(userRegisterDTO: UserRegisterDTO): Promise<UserRegisterDTO> {
    const creation: any = await this.mqService.rpc('job', {
      type: 'db',
      action: 'user.create',
      payload: userRegisterDTO,
    });

    if (creation.error) {
      throw new ConflictException(creation.message);
    }

    return creation;
  }
}