import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // async 를 붙여 Promise 처리가 가능.
  async intercept(context: ExecutionContext, next: CallHandler) {
    console.log('LoggingInterceptor : Before...');

    const now = Date.now();

    // console.log(context);

    return next.handle().pipe(
      // map((res) => console.log(res)), // 응답을 이렇게 가져올 수 있고,
      map((data) => ({ data })), // 이렇게 커스텀하여 응답을 변형 시킬 수 있음. { "data": 응답 }
      tap(() =>
        console.log(`LoggingInterceptor : After... ${Date.now() - now}ms`),
      ),
    );
  }
}
