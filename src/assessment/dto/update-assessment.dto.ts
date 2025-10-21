import { PartialType } from '@nestjs/swagger';
import { CreateAssessmentDTO } from './create-assessment.dto';

export class UpdateAssessmentDTO extends PartialType(CreateAssessmentDTO) {}
