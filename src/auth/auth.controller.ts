import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDTO): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return { accessToken };
  }
}
