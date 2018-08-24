import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from 'app.module';
import { AuthGuard } from 'guards/auth.guards';
import { TimeoutInterceptor } from 'interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  await app.listen(process.env.PORT);
}

bootstrap();
