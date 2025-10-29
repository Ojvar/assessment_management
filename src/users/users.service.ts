import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findById(id: number): Promise<UserDTO> {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserDTO> {
    return this.prisma.user.findUniqueOrThrow({
      where: { email: email },
    });
  }
}
