import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/:id')
  @HttpCode(200)
  async findByEmail(@Param('id') id: number): Promise<UserDTO> {
    const user = await this.usersService.findById(id);
    return plainToInstance(UserDTO, user);
  }
}
