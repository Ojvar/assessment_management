import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AssessmentService } from './assessment.service';

describe('AssessmentService', () => {
  let service: AssessmentService;

  const mockPrisma = {
    user: {
      findUnique: jest.fn(),
    },
    assessment: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssessmentService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<AssessmentService>(AssessmentService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an assessment successfully', async () => {
      const dto = { created_by: 1, title: 'Test Assessment' };
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.assessment.create.mockResolvedValue({
        id: 1,
        ...dto,
        reference_code: 'uuid',
      });

      const result = await service.create(dto);
      expect(result.id).toBe(1);
      expect(mockPrisma.assessment.create).toHaveBeenCalled();
    });

    it('should throw BadRequestException if user not found', async () => {
      const dto = { created_by: 1, title: 'Test Assessment' };
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all assessments', async () => {
      mockPrisma.assessment.findMany.mockResolvedValue([{ id: 1 }]);
      const result = await service.findAll();
      expect(result).toEqual([{ id: 1 }]);
      expect(mockPrisma.assessment.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single assessment', async () => {
      mockPrisma.assessment.findUniqueOrThrow.mockResolvedValue({ id: 1 });
      const result = await service.findOne(1);
      expect(result).toEqual({ id: 1 });
    });
  });

  describe('update', () => {
    it('should update assessment successfully', async () => {
      const dto = { title: 'Updated' };
      mockPrisma.assessment.findUnique.mockResolvedValue({
        id: 1,
        created_by: 1,
      });
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.assessment.update.mockResolvedValue({ id: 1, ...dto });

      const result = await service.update(1, dto);
      expect(result.title).toBe('Updated');
      expect(mockPrisma.assessment.update).toHaveBeenCalled();
    });

    it('should throw NotFoundException if assessment not found', async () => {
      mockPrisma.assessment.findUnique.mockResolvedValue(null);
      await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if reference_code exists', async () => {
      mockPrisma.assessment.findUnique.mockResolvedValue({
        id: 1,
        reference_code: 'abc',
        created_by: 1,
      });
      mockPrisma.assessment.findUnique.mockResolvedValueOnce({
        id: 1,
        reference_code: 'abc',
        created_by: 1,
      });
      mockPrisma.assessment.findUnique.mockResolvedValueOnce({ id: 2 }); // duplicate
      await expect(
        service.update(1, { reference_code: 'duplicate' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should soft-delete assessment', async () => {
      mockPrisma.assessment.findUnique.mockResolvedValue({
        id: 1,
        deleted_at: null,
      });
      mockPrisma.assessment.update.mockResolvedValue({
        id: 1,
        deleted_at: new Date(),
      });

      const result = await service.remove(1);
      expect(result.deleted_at).toBeInstanceOf(Date);
    });

    it('should throw NotFoundException if assessment not found', async () => {
      mockPrisma.assessment.findUnique.mockResolvedValue(null);
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
