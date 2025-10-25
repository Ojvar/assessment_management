import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  findById(id: number): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { email: email },
    });
  }
}
