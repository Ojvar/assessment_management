import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<UserDTO> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: { role: true },
    });

    return {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role?.role || null,
    };
  }

  async findByEmail(email: string): Promise<UserDTO> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email },
      include: { role: true },
    });

    return {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role?.role || null,
    };
  }
}
