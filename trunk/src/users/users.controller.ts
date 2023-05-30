import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorator/roles.decorator';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'a')
  // @UseInterceptors(LoggingInterceptor) // 메서드 수준에서 인터셉터 바인딩
  findOne(@Param('id', ParseIntPipe) id: number) {
    const res = this.usersService.findOne(id);
    // console.log(res);
    return res;
  }

  @Patch(':id')
  @Roles('admin', 'b')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete()
  @Roles('admin', 'c')
  remove(@Query('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
