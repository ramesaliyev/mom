import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CacheService } from 'core/services/cache.service';
import { UserService } from 'modules/user/user.service';
import { UserRegisterDTO, UserSafeDTO } from 'modules/user/user.dto';
import { User } from 'modules/user/user.entity';
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
    const accessToken = await this.generateToken(userSafeResponse);

    return {
      ...userSafeResponse,
      accessToken
    };
  }

  async generateToken(user: UserSafeDTO): Promise<string> {
    const accessToken = await this.signToken(user);

    await this.cacheService.set(
      this.getCacheKey(user.id),
      accessToken,
      { expire: process.env.LOGIN_EXPIRES_IN_SECONDS }
    );
    
    return accessToken;
  }

  async renewToken(userFromToken: UserSafeDTO) {
    const user = await this.userService.findOneById(userFromToken.id);
    return await this.generateToken(user.safeResponse());
  }

  async logout(user: any) {
    return await this.cacheService.remove(this.getCacheKey(user.id));
  }

  async register(user: UserRegisterDTO) {
    return await this.userService.create(user);
  }

  getCacheKey(id: number): string {
    return `${process.env.USER_TOKEN_CACHE_PREFIX}${id}`;
  }

  async signToken(payload: any): Promise<string> {
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