import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service'; // Prisma را به صورت مستقیم استفاده می‌کنیم

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, // دسترسی به دیتابیس
    private jwtService: JwtService, // برای تولید JWT
  ) { }

  async login(email: string, password: string) {
    // جستجو برای کاربر با ایمیل
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // بررسی اینکه آیا رمز عبور درست است یا نه
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // اگر اعتبارسنجی موفق بود، JWT تولید می‌کنیم
    const payload = { sub: user.id, email: user.email }; // payload حاوی اطلاعات کاربر
    const access_token = this.jwtService.sign(payload); // امضا کردن و ایجاد JWT

    return { access_token };
  }
}
