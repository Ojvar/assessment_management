import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Assessments')
@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new assessment' })
  @ApiResponse({ status: 201, description: 'Assessment created successfully' })
  create(@Body() dto: CreateAssessmentDto) {
    return this.assessmentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all assessments' })
  findAll() {
    return this.assessmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single assessment by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assessmentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an assessment by ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAssessmentDto,
  ) {
    return this.assessmentService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an assessment by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.assessmentService.remove(id);
  }
}
