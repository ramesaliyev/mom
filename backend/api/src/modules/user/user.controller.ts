import { Get, Post, Controller, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users.map(user => user.safeResponse());
  }

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      whitelist: true,
    }),
  )
  async create(@Body() userDTO: UserDTO) {
    return await this.userService.create(userDTO);
  }
}