import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDTO } from './dto/login-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Login and get JWT' })
  @ApiResponse({
    status: 200,
    description: 'The JWT token has been successfully generated.',
  })
  async login(): Promise<LoginResponseDTO> {
    const user = { username: 'existingUser', userId: 1 };
    return this.authService.login(user);
  }
}
