import {
<<<<<<< HEAD
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import Logger from '../utils/logger';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@Injectable()
export class AssessmentService {
  constructor(private prisma: PrismaService) { }
=======
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import logger from '../utils/logger';

@Injectable()
export class AssessmentService {
<<<<<<< HEAD
<<<<<<< HEAD
  constructor(private prisma: PrismaService) {}
>>>>>>> 86154e2 (update .gitignore)
=======
  constructor(private prisma: PrismaService) { }
>>>>>>> fa68f8f (Squashed commit of the following:)
=======
  constructor(private prisma: PrismaService) { }
>>>>>>> 4924fe6 (add:logger)

  // ================= CREATE =================
  async create(dto: CreateAssessmentDto) {
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
        },
      });
    } catch (error) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      Logger.error('❌ Error creating assessment:', error);
=======
      console.error('❌ Error creating assessment:', error);
>>>>>>> 86154e2 (update .gitignore)
=======
      logger.error('❌ Error creating assessment:', error);
>>>>>>> fa68f8f (Squashed commit of the following:)
=======
      logger.error('❌ Error creating assessment:', error);
>>>>>>> 4924fe6 (add:logger)
      throw new BadRequestException('Failed to create assessment');
    }
  }

  // ================= FIND ALL =================
  async findAll() {
    return this.prisma.assessment.findMany({
      where: { deletedAt: null },
      include: { creator: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ================= FIND ONE =================
  async findOne(id: number) {
    const assessment = await this.prisma.assessment.findUnique({
      where: { id },
      include: { creator: true },
    });
    if (!assessment || assessment.deletedAt)
      throw new NotFoundException('Assessment not found');
    return assessment;
  }

  // ================= UPDATE =================
  async update(id: number, dto: UpdateAssessmentDto) {
    const existing = await this.prisma.assessment.findUnique({ where: { id } });
    if (!existing || existing.deletedAt)
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
        },
      });
    } catch (error) {
      logger.error('❌ Error updating assessment:', error);
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('Failed to update assessment');
    }
  }

  // ================= REMOVE (SOFT DELETE) =================
  async remove(id: number) {
    const existing = await this.prisma.assessment.findUnique({ where: { id } });
    if (!existing || existing.deletedAt)
      throw new NotFoundException('Assessment not found');

    return this.prisma.assessment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
