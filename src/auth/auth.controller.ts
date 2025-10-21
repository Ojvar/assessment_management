import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto'; // تغییر به LoginDTO

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    // بررسی اینکه loginDto دریافت شده است یا نه
    if (!loginDto || !loginDto.email || !loginDto.password) {
      return { message: 'Invalid request body', statusCode: 400 }; // خطای درخواست اشتباه
    }

    const result = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    if (!result) {
      return { message: 'Invalid credentials', statusCode: 401 };
    }
    return result; // برگرداندن JWT
  }
}
