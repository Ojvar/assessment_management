import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnumErrorType, throwError } from 'src/helpers/error.helper';
import { RequestWithUser } from 'src/types/request.type';
import { JwtPayload } from '../types';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = request.headers['authorization'] as string;

    if (!token) {
      throwError(EnumErrorType.JwtTokenError);
    }

    try {
      const decoded = this.jwtService.verify<JwtPayload>(
        token.replace('Bearer ', ''),
      );
      request.user = decoded;
    } catch (error: unknown) {
      console.error(error);
      throwError(EnumErrorType.InavlidJwtToken);
    }

    return true;
  }
}
