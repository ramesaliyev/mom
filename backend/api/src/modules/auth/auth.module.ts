import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CacheService } from 'core/services/cache.service';
import { UserModule } from 'modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: +process.env.LOGIN_EXPIRES_IN_SECONDS
      }
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [
    CacheService,
    AuthService
  ],
})
export class AuthModule {}