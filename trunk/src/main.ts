import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionExpressFilter } from './common/filter/all.exception.express.filter';
import { AllExceptionHttpAdapterFilter } from './common/filter/all.exception.httpAdapter.filter';
import { BongGuard } from './common/guard/bong.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 서비스내 전역 필터 적용
  // app.useGlobalFilters(new AllExceptionExpressFilter());
  // app.useGlobalFilters(
  //   new AllExceptionHttpAdapterFilter(app.get(HttpAdapterHost)),
  // );

  // 서비스내 전역 가드 적용
  // app.useGlobalGuards(new BongGuard());
  await app.listen(3000);
}
bootstrap();
