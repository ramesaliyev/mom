import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'modules/auth/auth.module';
import { UserModule } from 'modules/user/user.module';

import { JobController } from './job.controller';
import { JobService } from './job.service';
import { Job } from './job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    UserModule,
    AuthModule,
  ],
  controllers: [
    JobController
  ],
  providers: [
    JobService
  ],
})
export class JobModule {}