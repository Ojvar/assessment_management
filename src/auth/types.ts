import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsString } from 'class-validator';

export class JwtPayload {
  @ApiProperty()
  @IsString()
  access_token: string;

  constructor(data?: Partial<JwtPayload>) {
    Object.assign(this, data);
  }
}

export interface DecodedJwtPayload {
  email: string;
  sub: number;
  roleId?: number;
}
