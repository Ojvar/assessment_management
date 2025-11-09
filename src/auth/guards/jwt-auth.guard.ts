import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { EnumErrorType, throwError } from 'src/helpers/error.helper';
import { RequestWithUser } from 'src/types/request.type';
import { DecodedJwtPayload } from '../types';

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
      const decoded = this.jwtService.verify<DecodedJwtPayload>(
        token.replace('Bearer ', ''),
      );
      request.user = decoded;
    } catch (error: unknown) {
      // Check if the error is a TokenExpiredError
      if (error instanceof TokenExpiredError) {
        throwError(
          EnumErrorType.JwtTokenExpired,
          `Token expired at ${error.expiredAt.toISOString()}. Please login again.`,
        );
      }
      // Check if it's any other JWT-related error
      if (error instanceof JsonWebTokenError) {
        throwError(
          EnumErrorType.InavlidJwtToken,
          `Invalid token: ${error.message}`,
        );
      }
      // For any other unexpected errors, throw invalid token error
      throwError(EnumErrorType.InavlidJwtToken);
    }

    return true;
  }
}
