// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma';
import { UsersService } from '../users/users.service'; // فرض می‌کنیم که UsersService به درستی وارد شده است
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<User> {
    console.log('Searching for user with email:', email);
    try {
      const user = await this.usersService.findByEmail(email);
      console.log('User found:', user);
      if (user.password !== password) {
        throw new Error('Invalid credentials');
      }
      return user;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('User not found');
    }
  }

  async login(user: any) {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
