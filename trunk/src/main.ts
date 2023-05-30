import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionExpressFilter } from './common/filter/all.exception.express.filter';
import { AllExceptionHttpAdapterFilter } from './common/filter/all.exception.httpAdapter.filter';
import { BongGuard } from './common/guard/bong.guard';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 서비스내 전역 필터 바인딩
  // app.useGlobalFilters(new AllExceptionExpressFilter());
  // app.useGlobalFilters(
  //   new AllExceptionHttpAdapterFilter(app.get(HttpAdapterHost)),
  // );

  // 서비스내 전역 가드 바인딩
  // app.useGlobalGuards(new BongGuard());

  // 서비스내 전역 인터셉터 바인딩
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
