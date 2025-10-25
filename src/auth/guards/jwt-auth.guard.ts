import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../types';
import { RequestWithUser } from 'src/types/request.type';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = request.headers['authorization'] as string;

    if (!token) {
      throw new Error('No token provided');
    }

    try {
      const decoded = this.jwtService.verify<JwtPayload>(
        token.replace('Bearer ', ''),
      );
      request.user = decoded;
    } catch (error: unknown) {
      console.error(error);
      throw new Error('Invalid token');
    }

    return true;
  }
}
