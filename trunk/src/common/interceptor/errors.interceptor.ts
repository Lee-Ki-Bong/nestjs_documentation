import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SlackService } from './slack.service';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  private message;
  constructor(private readonly slackService: SlackService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 정보 추출
    const request = context.switchToHttp().getRequest();
    const path = request.path;
    const ipAddress = request.ip;
    const headers = request.headers;
    const queryParams = request.query;

    const controllerClass = context.getClass();
    const handlerMethod = context.getHandler();
    // const args = context.getArgs();

    return next.handle().pipe(
      catchError((err) =>
        throwError(() => {
          this.message = JSON.stringify(err.response, null, 2);
          console.log(this.message);
          this.slackService.log(this.message);
          return new BadGatewayException('뉴메샵에러');
        }),
      ),
    );
  }
}
