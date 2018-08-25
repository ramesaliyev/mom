import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-config';

import { DatabaseConfig } from 'config/database';
import { CoreController } from './core.controller';

import { UserModule } from 'modules/user/user.module';
import { AuthModule } from 'modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, '/../config/**/*.{ts,js}')
    ),
    TypeOrmModule.forRoot(DatabaseConfig as any),
    UserModule,
    AuthModule
  ],
  controllers: [CoreController],
})
export class CoreApplicatonModule {}