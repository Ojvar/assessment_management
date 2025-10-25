import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { User } from 'generated/prisma';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @HttpCode(200)
  findByEmail(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }
}
