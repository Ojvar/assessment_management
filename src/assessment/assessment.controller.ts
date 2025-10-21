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
import { AssessmentService } from './assessment.service';
import { AssessmentWithCreator } from './dto/assessment-response.dto';
import { CreateAssessmentDTO, UpdateAssessmentDTO } from './dto';

@ApiTags('Assessments')
@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new assessment' })
  @ApiResponse({ status: 201, description: 'Assessment created successfully' })
  create(@Body() dto: CreateAssessmentDTO): Promise<AssessmentWithCreator> {
    return this.assessmentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all assessments' })
  findAll(): Promise<AssessmentWithCreator[]> {
    return this.assessmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single assessment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Assessment retrieved successfully',
    type: CreateAssessmentDTO,
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AssessmentWithCreator | null> {
    return this.assessmentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an assessment by ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAssessmentDTO,
  ): Promise<AssessmentWithCreator> {
    return this.assessmentService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an assessment by ID' })
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AssessmentWithCreator> {
    return this.assessmentService.remove(id);
  }
}
