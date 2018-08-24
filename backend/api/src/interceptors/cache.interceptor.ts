import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const isCached = Math.random() > 0.2;

    if (isCached) {
      return of(['from-cache']);
    }

    return call$;
  }
}
