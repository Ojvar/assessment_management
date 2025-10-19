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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Assessment } from '@prisma/client';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@ApiTags('Assessments')
@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new assessment' })
  @ApiResponse({ status: 201, description: 'Assessment created successfully' })
  create(@Body() dto: CreateAssessmentDto): Promise<Assessment> {
    return this.assessmentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all assessments' })
  findAll(): Promise<Assessment[]> {
    return this.assessmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single assessment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Assessment retrieved successfully',
    type: CreateAssessmentDto,
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Assessment> {
    return this.assessmentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an assessment by ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAssessmentDto,
  ): Promise<Assessment> {
    return this.assessmentService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an assessment by ID' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Assessment> {
    return this.assessmentService.remove(id);
  }
}
