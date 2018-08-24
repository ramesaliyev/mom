import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AppController } from '../app.controller';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (context.getClass() === AppController) {
      const chance = Math.random() > 0.5;
      console.log(`AuthGuard AppController ${chance}!`);
      return chance;
    }

    return true;
  }
}
