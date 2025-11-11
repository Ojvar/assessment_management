import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProvinceDTO {
  @ApiProperty({
    description: 'Name of the province',
    example: 'Tehran',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(data: Partial<CreateProvinceDTO>) {
    Object.assign(this, data);
  }
}
