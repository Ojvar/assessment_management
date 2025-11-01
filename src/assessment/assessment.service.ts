import { Injectable, NotFoundException } from '@nestjs/common';
import { Assessment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAssessmentDTO, UpdateAssessmentDTO } from './dto';

@Injectable()
export class AssessmentService {
  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateAssessmentDTO): Promise<Assessment> {
    return this.prisma.assessment.create({ data });
  }

  findAll() {
    return this.prisma.assessment.findMany();
  }

  async findOne(id: number): Promise<Assessment> {
    return await this.prisma.assessment.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, data: UpdateAssessmentDTO): Promise<Assessment> {
    try {
      return await this.prisma.assessment.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Assessment with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.assessment.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Assessment with ID ${id} not found`);
    }
  }
}
