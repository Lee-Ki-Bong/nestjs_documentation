import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { BongGuard } from './common/guard/bong.guard';
import { RolesGuard } from './common/guard/roles.guard';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { ErrorsInterceptor } from './common/interceptor/errors.interceptor';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { HttpModule } from '@nestjs/axios';
import { SlackService } from './common/interceptor/slack.service';

@Module({
  imports: [
    // 환결 설정 모듈.
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['bong.env'],
    }),

    UsersModule,
    CatsModule,
  ],
  controllers: [],
  providers: [
    SlackService,
    // 위 부터 아래로 순서대로 호출.

    // 가드 전역 바인딩
    { provide: APP_GUARD, useClass: BongGuard },
    // { provide: APP_GUARD, useClass: RolesGuard },

    // 인터셉터 전역 바인딩
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    // { provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor },
  ],
})
export class AppModule implements NestModule {
  // 미들웨어 적용방법.
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
