import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateAssessmentDTO } from './create-assessment.dto';

export class UpdateAssessmentDTO extends PartialType(CreateAssessmentDTO) {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  provinceId?: number;

  @ApiPropertyOptional()
  cityId?: number;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  zipCode?: string;

  constructor(partial: Partial<UpdateAssessmentDTO>) {
    super();
    Object.assign(this, partial);
  }
}
