import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCityDTO {
  @ApiProperty({ description: 'City name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ description: 'Province ID' })
  @IsNumber()
  @IsNotEmpty()
  provinceId: number;


  constructor(data?: Partial<CreateCityDTO>) {
    Object.assign(this, data);
  }
}
