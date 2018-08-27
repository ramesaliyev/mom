import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CacheService } from 'core/services/cache.service';
import { UserService } from 'modules/user/user.service';
import { UserDTO } from 'modules/user/user.dto';
import { LoginDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly cacheService: CacheService,
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
    const accessToken = await this.createToken(userSafeResponse);

    await this.cacheService.set(
      this.getCacheKey(user.id),
      accessToken,
      { expire: process.env.LOGIN_EXPIRES_IN_SECONDS }
    );
    
    return {
      ...userSafeResponse,
      accessToken
    };
  }

  async logout(user: any) {
    return await this.cacheService.remove(this.getCacheKey(user.id));
  }

  async register(user: UserDTO) {
    return await this.userService.create(user);
  }

  getCacheKey(id: number): string {
    return `${process.env.USER_TOKEN_CACHE_PREFIX}${id}`;
  }

  async createToken(payload: any): Promise<string> {
    return await this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<boolean> {
    const user = await this.jwtService.verify(token);
    const cachedToken = await this.cacheService.get(this.getCacheKey(user.id));

    if (token !== cachedToken) {
      throw {
        message: "Old Token"
      }
    }

    return user;
  }
}