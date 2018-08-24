/**
 * Get Environment Configs
 */
import { config as getEnvironmentConfigs } from 'dotenv';
getEnvironmentConfigs();

/**
 * & Stuff
 */
import { NestFactory } from '@nestjs/core';
import { CoreApplicatonModule } from 'core/core.module';

export async function bootstrap() {
  const app = await NestFactory.create(CoreApplicatonModule);

  await app.listen(process.env.PORT);
}

bootstrap();