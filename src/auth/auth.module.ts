import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback_secret',
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) || '1h' },
    }),
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
