import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import Logger from '../utils/logger';
import { AssessmentWithCreator } from './dto/assessment-response.dto';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@Injectable()
export class AssessmentService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateAssessmentDto): Promise<AssessmentWithCreator> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: dto.created_by },
      });
      if (!user) {
        throw new BadRequestException('Invalid created_by user ID');
      }

      const referenceCode = dto.reference_code ?? randomUUID();

      return await this.prisma.assessment.create({
        data: {
          ...dto,
          reference_code: referenceCode,
          latitude:
            dto.latitude !== undefined
              ? new Prisma.Decimal(dto.latitude)
              : null,
          longitude:
            dto.longitude !== undefined
              ? new Prisma.Decimal(dto.longitude)
              : null,
          status: dto.status ?? 'draft',
          updated_at: new Date(),
        },
      });
    } catch (error) {
      Logger.error('❌ Error creating assessment:', error);
      throw new BadRequestException('Failed to create assessment');
    }
  }

  async findAll() {
    return this.prisma.assessment.findMany({
      where: { deleted_at: null },
      include: { User: true },
      orderBy: { created_at: 'desc' },
    });
  }

  findOne(id: number): Promise<AssessmentWithCreator | null> {
    return this.prisma.assessment.findUniqueOrThrow({
      where: { id },
      include: { User: true },
    });
  }

  async update(
    id: number,
    dto: UpdateAssessmentDto,
  ): Promise<AssessmentWithCreator> {
    const existing = await this.prisma.assessment.findUnique({ where: { id } });
    if (!existing || existing.deleted_at)
      throw new NotFoundException('Assessment not found');

    try {
      const { reference_code, latitude, longitude, created_by, ...rest } = dto;

      let newReferenceCode = existing.reference_code;
      if (reference_code && reference_code !== existing.reference_code) {
        const exists = await this.prisma.assessment.findUnique({
          where: { reference_code },
        });
        if (exists) {
          throw new BadRequestException('reference_code must be unique');
        }
        newReferenceCode = reference_code;
      }

      let newCreatedBy = existing.created_by;
      if (created_by && created_by !== existing.created_by) {
        const user = await this.prisma.user.findUnique({
          where: { id: created_by },
        });
        if (!user) {
          throw new BadRequestException('Invalid created_by user ID');
        }
        newCreatedBy = created_by;
      }

      return await this.prisma.assessment.update({
        where: { id },
        data: {
          ...rest,
          latitude:
            latitude !== undefined ? new Prisma.Decimal(latitude) : undefined,
          longitude:
            longitude !== undefined ? new Prisma.Decimal(longitude) : undefined,
          reference_code: newReferenceCode,
          created_by: newCreatedBy,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      Logger.error('❌ Error updating assessment:', error);
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('Failed to update assessment');
    }
  }

  async remove(id: number) {
    const existing = await this.prisma.assessment.findUnique({ where: { id } });
    if (!existing || existing.deleted_at)
      throw new NotFoundException('Assessment not found');

    return this.prisma.assessment.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
