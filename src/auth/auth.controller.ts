import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Roles } from './decorators/roles.decorator';
import { LoginDTO } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtPayload } from './types';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    type: JwtPayload,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })

  login(@Body() loginDto: LoginDTO): Promise<JwtPayload> {
    return this.authService.validateUser(loginDto.email, loginDto.password);
  }

  @Post('/protected')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Example: only users with 'admin' role can access this endpoint
  @ApiResponse({
    status: 200,
    description: 'Access granted',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Insufficient permissions',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  protectedRoute() {
    return { message: 'This is a protected route that requires admin role' };
  }
}
