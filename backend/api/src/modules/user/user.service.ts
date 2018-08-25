import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './user.UserDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneBy(by: any): Promise<User> {
    return await this.userRepository.findOne(by);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ cache : true }); // caching to redis example
  }

  async create(userDTO: UserDTO): Promise<User[]> {
    const user = this.userRepository.create(userDTO);
    
    const isExist = await this.findOneByEmail(user.email);

    if (isExist) {
      throw new ConflictException('Email already used.');
    }

    await this.userRepository.save(user);

    return user.safeResponse();
  }
}