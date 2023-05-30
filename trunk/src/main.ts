import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionExpressFilter } from './common/filter/all.exception.express.filter';
import { AllExceptionHttpAdapterFilter } from './common/filter/all.exception.httpAdapter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new AllExceptionExpressFilter());
  // app.useGlobalFilters(
  //   new AllExceptionHttpAdapterFilter(app.get(HttpAdapterHost)),
  // );
  await app.listen(3000);
}
bootstrap();
