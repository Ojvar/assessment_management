import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (user.password !== password) {
        throw new Error('Invalid credentials');
      }
      return user;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('User not found');
    }
  }
}
