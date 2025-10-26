import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnumErrorType, throwError } from 'src/helpers/error.helper';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<JwtPayload> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (user.password !== password) {
        throwError(EnumErrorType.UnauthorizedException);
      }

      const payload = { email: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload);

      return new JwtPayload({
        access_token: accessToken,
      });
    } catch {
      throwError(EnumErrorType.UnauthorizedException);
    }
  }
}
