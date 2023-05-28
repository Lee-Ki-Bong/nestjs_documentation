import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const resJson = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    console.log(resJson);

    response.status(status).json(resJson);
  }
}
