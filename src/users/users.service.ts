import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findById(id: number): Promise<UserDTO> {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  findByEmail(email: string): Promise<UserDTO> {
    return this.prisma.user.findUniqueOrThrow({
      where: { email: email },
    });
  }
}
