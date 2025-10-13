import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class CreateAssessmentDto {
  @ApiProperty({ description: 'Title of the assessment' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Detailed description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Address of the assessment' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Province' })
  @IsString()
  province: string;

  @ApiPropertyOptional({ description: 'Latitude', example: 35.6892 })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({ description: 'Longitude', example: 51.389 })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiPropertyOptional({
    description: 'Map points',
    example: [{ lat: 35.6892, lng: 51.389 }],
  })
  @IsArray()
  @IsOptional()
  map_points?: { lat: number; lng: number }[];

  @ApiPropertyOptional({
    description: 'Status',
    enum: Status,
    default: Status.draft,
  })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiPropertyOptional({ description: 'Reference code' })
  @IsString()
  @IsOptional()
  reference_code?: string;

  @ApiProperty({ description: 'ID of creator user' })
  @IsNumber()
  created_by: number;
}
