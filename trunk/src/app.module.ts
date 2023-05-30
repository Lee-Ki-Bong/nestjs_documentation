import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { BongGuard } from './common/guard/bong.guard';
import { RolesGuard } from './common/guard/roles.guard';

@Module({
  imports: [UsersModule],
  controllers: [],

  // MSA 전역적으로 가드 적용
  providers: [
    // 위 부터 아래로 순서대로 호출.
    { provide: APP_GUARD, useClass: BongGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule implements NestModule {
  // 미들웨어 적용방법.
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
