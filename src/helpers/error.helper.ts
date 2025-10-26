import { UnauthorizedException } from '@nestjs/common';

export enum EnumErrorType {
  UnauthorizedException,
  JwtTokenError,
  InavlidJwtToken,
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
      throw new Error('No token provided');
    case EnumErrorType.InavlidJwtToken:
      throw new Error('Invalid token');
    case EnumErrorType.Error:
    default:
      throw new Error(message, options);
  }
}
