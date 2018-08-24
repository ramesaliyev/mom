import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'modules/user/user.service';
import { LoginDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<any> {
    const user = await this.userService.findOneByEmail(loginDTO.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await user.comparePasswords(loginDTO.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    const userSafeResponse = user.safeResponse();
    const accessToken = this.jwtService.sign(userSafeResponse);

    return {
      ...userSafeResponse,
      token: `Bearer ${accessToken}`
    };
  }

  async validateUser(): Promise<any> {
    return true;
  }
}