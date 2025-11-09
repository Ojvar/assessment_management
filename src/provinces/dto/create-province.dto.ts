import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProvinceDto {
  @ApiProperty({
    description: 'Name of the province',
    example: 'Tehran',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(partial: Partial<CreateProvinceDto>) {
    Object.assign(this, partial);
  }
}
