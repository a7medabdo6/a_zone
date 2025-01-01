import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import deepResolvePromises from './deep-resolver';

@Injectable()
export class ResolvePromisesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const handler = context.getHandler();
    console.log(handler.name, 'handler.name');

    const isSseRoute = handler.name === 'streamNotifications';

    if (isSseRoute) {
      // If it's an SSE route, skip promise resolution and just pass the observable through
      return next.handle();
    }
    return next.handle().pipe(map((data) => deepResolvePromises(data)));
  }
}
