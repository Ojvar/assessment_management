import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Assessment } from '@prisma/client';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDTO, UpdateAssessmentDTO } from './dto';

@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  create(@Body() dto: CreateAssessmentDTO): Promise<Assessment> {
    return this.assessmentService.create(dto);
  }

  @Get()
  findAll() {
    return this.assessmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Assessment> {
    return this.assessmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAssessmentDTO,
  ): Promise<Assessment> {
    return this.assessmentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.assessmentService.remove(id);
  }
}
