import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CityDTO {
  @ApiProperty({ description: 'City ID' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'City name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Province ID' })
  @IsNumber()
  provinceId: number;

  constructor(data?: Partial<CityDTO>) {
    Object.assign(this, data);
  }
}
