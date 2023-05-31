import { Inject, Injectable } from '@nestjs/common';
import { CatsConstants } from './cats.constants';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @Inject('CATS_CONSTANTS')
    private readonly catsConstants: typeof CatsConstants,
  ) {}
  create(createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  findAll() {
    return `This action returns all cats ${this.catsConstants.HOLLOW_MESSAGE}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
