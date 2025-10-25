import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<string> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (user.password !== password) {
        throw new Error('Invalid credentials');
      }

      const payload = { email: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload);

      return accessToken;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('User not found');
    }
  }
}
