import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentService } from './assessment.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

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

  // ================= CREATE =================
  describe('create', () => {
    it('should create an assessment successfully', async () => {
      const dto = {
        title: 'Test Assessment',
        address: 'Street 123',
        city: 'Tehran',
        province: 'Tehran',
        created_by: 1,
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
      (prisma.assessment.create as jest.Mock).mockResolvedValue({
        id: 1,
        ...dto,
        reference_code: 'abc-123',
      });

      const result = await service.create(dto as any);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(prisma.assessment.create).toHaveBeenCalled();
      expect(result.title).toBe('Test Assessment');
    });

    it('should throw if created_by user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.create({
          title: 'Bad User',
          address: 'x',
          city: 'x',
          province: 'x',
          created_by: 999,
        } as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  // ================= FIND ALL =================
  describe('findAll', () => {
    it('should return all assessments', async () => {
      const mockData = [
        { id: 1, title: 'A' },
        { id: 2, title: 'B' },
      ];
      (prisma.assessment.findMany as jest.Mock).mockResolvedValue(mockData);

      const result = await service.findAll();

      expect(result).toEqual(mockData);
      expect(prisma.assessment.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        include: { creator: true },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  // ================= FIND ONE =================
  describe('findOne', () => {
    it('should return one assessment by id', async () => {
      const mockAssessment = { id: 1, title: 'Test', deletedAt: null };
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(
        mockAssessment,
      );

      const result = await service.findOne(1);

      expect(result).toEqual(mockAssessment);
    });

    it('should throw NotFoundException if not found', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if deleted', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        deletedAt: new Date(),
      });

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  // ================= UPDATE =================
  describe('update', () => {
    it('should update an assessment successfully', async () => {
      const existing = { id: 1, reference_code: 'old-ref', created_by: 1 };
      const dto = { title: 'Updated Title' };

      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(existing);
      (prisma.assessment.update as jest.Mock).mockResolvedValue({
        ...existing,
        ...dto,
      });

      const result = await service.update(1, dto as any);

      expect(result.title).toBe('Updated Title');
      expect(prisma.assessment.update).toHaveBeenCalled();
    });

    it('should throw if assessment not found', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.update(1, {} as any)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw if new reference_code already exists', async () => {
      const existing = { id: 1, reference_code: 'ref1', created_by: 1 };
      (prisma.assessment.findUnique as jest.Mock)
        .mockResolvedValueOnce(existing)
        .mockResolvedValueOnce({ id: 2, reference_code: 'ref2' });

      await expect(
        service.update(1, { reference_code: 'ref2' } as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw if new created_by user invalid', async () => {
      const existing = { id: 1, reference_code: 'ref1', created_by: 1 };
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(existing);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        service.update(1, { created_by: 999 } as any),
      ).rejects.toThrow(BadRequestException);
    });
  });

  // ================= REMOVE =================
  describe('remove', () => {
    it('should soft delete an assessment', async () => {
      const existing = { id: 1, deletedAt: null };
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(existing);
      (prisma.assessment.update as jest.Mock).mockResolvedValue({
        ...existing,
        deletedAt: new Date(),
      });

      const result = await service.remove(1);

      expect(result.deletedAt).toBeDefined();
      expect(prisma.assessment.update).toHaveBeenCalled();
    });

    it('should throw if not found', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
