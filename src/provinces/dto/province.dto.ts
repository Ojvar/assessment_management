import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ProvinceDTO {
  @ApiProperty({
    description: 'The unique identifier of the province',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Name of the province',
    example: 'Tehran',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(data?: Partial<ProvinceDTO>) {
    Object.assign(this, data);
  }
}
