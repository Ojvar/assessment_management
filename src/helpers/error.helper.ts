import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export enum EnumErrorType {
  UnauthorizedException,
  JwtTokenError,
  InavlidJwtToken,
  JwtTokenExpired,
  NotFoundException,
  Error,
}

export function throwError(
  type: EnumErrorType,
  message?: string,
  options?: ErrorOptions,
): never {
  switch (type) {
    case EnumErrorType.UnauthorizedException:
      throw new UnauthorizedException(message ?? 'Invalid credentials');
    case EnumErrorType.JwtTokenError:
      throw new UnauthorizedException(message ?? 'No token provided');
    case EnumErrorType.InavlidJwtToken:
      throw new UnauthorizedException(message ?? 'Invalid token');
    case EnumErrorType.JwtTokenExpired:
      throw new UnauthorizedException(message ?? 'Token has expired');
    case EnumErrorType.NotFoundException:
      throw new NotFoundException(message);
    case EnumErrorType.Error:
    default:
      throw new Error(message, options);
  }
}
