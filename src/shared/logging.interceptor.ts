import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const now = Date.now();
    const method = req.method;
    const url = req.url;
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(`${method} ${url} After... ${Date.now() - now}ms`),
        ),
      );
  }
}
