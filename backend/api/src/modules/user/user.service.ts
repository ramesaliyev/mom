import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRegisterDTO } from './user.dto';

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

  async findOneById(id: number): Promise<User> {
    return await this.findOneBy({ id });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ cache : true }); // caching to redis example
  }

  async create(userRegisterDTO: UserRegisterDTO): Promise<UserRegisterDTO> {
    const user = this.userRepository.create(userRegisterDTO);
    
    const isExist = await this.findOneByEmail(user.email);

    if (isExist) {
      throw new ConflictException('Email already used.');
    }

    await this.userRepository.save(user);

    return user.safeResponse();
  }
}