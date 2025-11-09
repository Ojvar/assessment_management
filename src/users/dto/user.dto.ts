import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role?: string | null;

  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }
}
