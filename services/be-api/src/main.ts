import "./lib/configure-env";

/**
 * & Stuff
 */
import { NestFactory } from '@nestjs/core';
import { CoreApplicatonModule } from 'core/core.module';

export async function bootstrap() {
  const app = await NestFactory.create(CoreApplicatonModule);

  app.enableCors();

  await app.listen(process.env.API_PORT);
}

bootstrap();