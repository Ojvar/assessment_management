import { ApiProperty } from '@nestjs/swagger';
import { Assessment, User } from '@prisma/client';

class MapPointDto {
  @ApiProperty({ example: 35.6892 })
  lat: number;

  @ApiProperty({ example: 51.389 })
  lng: number;
}

export class AssessmentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Building Safety Assessment' })
  title: string;

  @ApiProperty({ example: 'Assessing structural safety of building' })
  description: string;

  @ApiProperty({ example: '123 Main St' })
  address: string;

  @ApiProperty({ example: 'Tehran' })
  city: string;

  @ApiProperty({ example: 'Tehran Province' })
  province: string;

  @ApiProperty({ example: 35.6892 })
  latitude: number;

  @ApiProperty({ example: 51.389 })
  longitude: number;

  @ApiProperty({ type: [MapPointDto] })
  map_points: MapPointDto[];

  @ApiProperty({ example: 'draft' })
  status: string;

  @ApiProperty({ example: 'REF-12345' })
  reference_code: string;

  @ApiProperty({ example: 1 })
  created_by: number;
}


export type AssessmentWithCreator = Assessment & { creator: User }