import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtPayload } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDTO): Promise<JwtPayload> {
    return this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
  }
}
