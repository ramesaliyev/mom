import { Get, Post, Controller, UsePipes, ValidationPipe, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  async login(@Body() loginDTO: LoginDTO) {
    return await this.authService.login(loginDTO);
  }

  @Get('auth-test')
  @UseGuards(AuthGuard('jwt'))
  test(@Body() falan: any) {
    console.log(falan);
    return 'Authorized!';
  }
}