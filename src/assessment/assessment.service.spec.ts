import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDTO } from './dto';

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('mock-uuid'),
}));

describe('AssessmentService', () => {
  let service: AssessmentService;
  // let prisma: PrismaService;

  const mockUser = { id: 1, name: 'Test User' };
  const mockAssessment = {
    id: 1,
    reference_code: 'mock-uuid',
    latitude: new Prisma.Decimal(10),
    longitude: new Prisma.Decimal(20),
    created_by: 1,
    status: 'draft',
    deletedAt: null,
    creator: mockUser,
  };

  const prismaMock = {
    user: {
      findUnique: jest.fn(),
    },
    assessment: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssessmentService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<AssessmentService>(AssessmentService);
    // prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create assessment successfully', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser);
      prismaMock.assessment.create.mockResolvedValue(mockAssessment);

      const dto: CreateAssessmentDTO = {
        created_by: 1,
        latitude: 10,
        longitude: 20,
      };
      const result = await service.create(dto);

      expect(result).toEqual(mockAssessment);
      expect(prismaMock.assessment.create).toHaveBeenCalled();
    });

    it('should throw BadRequestException if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const dto = { created_by: 999, latitude: 10, longitude: 20 };
      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all assessments', async () => {
      prismaMock.assessment.findMany.mockResolvedValue([mockAssessment]);

      const result = await service.findAll();

      expect(result).toEqual([mockAssessment]);
      expect(prismaMock.assessment.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        include: { creator: true },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return an assessment', async () => {
      prismaMock.assessment.findUnique.mockResolvedValue(mockAssessment);

      const result = await service.findOne(1);
      expect(result).toEqual(mockAssessment);
    });

    it('should throw NotFoundException if assessment not found', async () => {
      prismaMock.assessment.findUnique.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if assessment is deleted', async () => {
      prismaMock.assessment.findUnique.mockResolvedValue({
        ...mockAssessment,
        deletedAt: new Date(),
      });
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update assessment successfully', async () => {
      prismaMock.assessment.findUnique.mockResolvedValue(mockAssessment);
      prismaMock.assessment.update.mockResolvedValue(mockAssessment);

      const dto = { status: 'published' };
      const result = await service.update(1, dto);

      expect(result).toEqual(mockAssessment);
      expect(prismaMock.assessment.update).toHaveBeenCalled();
    });

    it('should throw NotFoundException if assessment not found', async () => {
      prismaMock.assessment.findUnique.mockResolvedValue(null);
      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if reference_code already exists', async () => {
      prismaMock.assessment.findUnique
        .mockResolvedValueOnce(mockAssessment) // existing assessment
        .mockResolvedValueOnce({ id: 2 }); // duplicate reference_code

      await expect(
        service.update(1, { reference_code: 'duplicate-code' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should soft delete assessment', async () => {
      prismaMock.assessment.findUnique.mockResolvedValue(mockAssessment);
      prismaMock.assessment.update.mockResolvedValue({
        ...mockAssessment,
        deletedAt: new Date(),
      });

      const result = await service.remove(1);
      expect(result.deletedAt).toBeInstanceOf(Date);
    });

    it('should throw NotFoundException if assessment not found', async () => {
      prismaMock.assessment.findUnique.mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
