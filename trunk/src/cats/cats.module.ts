import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CatsConstants } from './cats.constants';

@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    { provide: 'CATS_CONSTANTS', useValue: CatsConstants },
  ],
})
export class CatsModule {}
