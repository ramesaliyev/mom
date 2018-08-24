import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { logger, LoggerMiddleware } from './middlewares/logger.middleware';

import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [ConfigModule.load(), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(CatsController);
  }
}
