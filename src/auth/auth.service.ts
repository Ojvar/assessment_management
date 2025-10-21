import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDTO } from './dto/login-response.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  async login(user: User): Promise<LoginResponseDTO> {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
