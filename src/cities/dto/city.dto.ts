import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CityDTO {
  @ApiProperty({ description: 'City name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Province ID' })
  @IsNumber()
  provinceId: number;
}
