import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentService } from './assessment.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AssessmentService', () => {
  let service: AssessmentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssessmentService,
        {
          provide: PrismaService,
          useValue: {
            assessment: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
            user: {
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AssessmentService>(AssessmentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create an assessment successfully', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
      (prisma.assessment.create as jest.Mock).mockResolvedValue({ id: 1 });

      const result = await service.create({
        created_by: 1,
        name: 'Test',
      } as any);

      expect(result).toEqual({ id: 1 });
      expect(prisma.assessment.create).toHaveBeenCalled();
    });

    it('should throw BadRequestException if user is invalid', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.create({ created_by: 999, name: 'Invalid' } as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all assessments', async () => {
      (prisma.assessment.findMany as jest.Mock).mockResolvedValue([{ id: 1 }]);
      const result = await service.findAll();
      expect(result).toEqual([{ id: 1 }]);
    });
  });

  describe('findOne', () => {
    it('should return a single assessment', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        deletedAt: null,
      });
      const result = await service.findOne(1);
      expect(result).toEqual({ id: 1, deletedAt: null });
    });

    it('should throw NotFoundException if not found', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      (prisma.assessment.findUnique as jest.Mock)
        .mockResolvedValueOnce({ id: 1, reference_code: 'abc', created_by: 1 }) // existing
        .mockResolvedValueOnce(null); // for checking duplicate reference_code

      (prisma.assessment.update as jest.Mock).mockResolvedValue({ id: 1 });

      const result = await service.update(1, { reference_code: 'new' } as any);
      expect(result).toEqual({ id: 1 });
    });

    it('should throw NotFoundException if assessment not found', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.update(99, {} as any)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should soft delete assessment', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        deletedAt: null,
      });
      (prisma.assessment.update as jest.Mock).mockResolvedValue({ id: 1 });

      const result = await service.remove(1);
      expect(result).toEqual({ id: 1 });
      expect(prisma.assessment.update).toHaveBeenCalled();
    });

    it('should throw NotFoundException if already deleted', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        deletedAt: new Date(),
      });
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
