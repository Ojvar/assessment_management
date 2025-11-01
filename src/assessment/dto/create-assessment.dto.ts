import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateAssessmentDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  provinceId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'minLength: 5, maxLength: 10' })
  @IsString()
  @Length(5, 10)
  zipCode: string;

  constructor(partial: Partial<CreateAssessmentDTO>) {
    Object.assign(this, partial);
  }
}
