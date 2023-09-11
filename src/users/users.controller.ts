import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { serialize } from './interceptors/serialize.interceptor';
import { UserDto } from './dtos/user-dto';

@Controller('users')
@serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne({ id: parseInt(id) });
    if (!user)
      throw new NotFoundException(`the user with id ${id} is not found`);
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(parseInt(id));
  }
}
