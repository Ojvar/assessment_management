import { Injectable, NotFoundException } from '@nestjs/common';
import { Assessment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssessmentDTO } from './dto/create-assessment.dto';
import { UpdateAssessmentDTO } from './dto/update-assessment.dto';

@Injectable()
export class AssessmentService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAssessmentDTO): Promise<Assessment> {
    return this.prisma.assessment.create({ data });
  }

  findAll() {
    return this.prisma.assessment.findMany();
  }

  async findOne(id: number): Promise<Assessment> {
    const assessment = await this.prisma.assessment.findUnique({
      where: { id },
    });
    if (!assessment)
      throw new NotFoundException(`Assessment with ID ${id} not found`);
    return assessment;
  }

  async update(id: number, data: UpdateAssessmentDTO): Promise<Assessment> {
    await this.findOne(id);
    return this.prisma.assessment.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.assessment.delete({ where: { id } });
  }
}
