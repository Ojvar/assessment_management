import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Status } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

describe('AssessmentService', () => {
  let service: AssessmentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const mockPrismaService: Partial<PrismaService> = {
      assessment: {
        create: jest.fn((dto: CreateAssessmentDto) => ({
          id: 1,
          title: dto.title,
          description: dto.description,
          address: dto.address,
          city: dto.city,
          province: dto.province,
          latitude: dto.latitude ?? null,
          longitude: dto.longitude ?? null,
          map_points: dto.map_points ?? [],
          status: dto.status ?? Status.draft,
          reference_code: dto.reference_code ?? 'abc',
          created_by: dto.created_by,
          deletedAt: null,
        })),
        findMany: jest.fn(() => [{ id: 1 }]),
        findUnique: jest.fn(() => null),
        update: jest.fn(
          (data: Partial<CreateAssessmentDto> & { id: number }) => ({
            id: data.id,
            ...data,
            deletedAt: null,
          }),
        ),
      },
      user: {
        findUnique: jest.fn((args: { where: { id: number } }) => ({
          id: args.where.id,
        })),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssessmentService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AssessmentService>(AssessmentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create an assessment successfully', async () => {
    const result = await service.create(dto);
    expect(result).toHaveProperty('id');
    expect(result.title).toBe(dto.title);
  });

  it('should throw BadRequestException if user is invalid', async () => {
    prisma.user.findUnique = jest.fn(() => null);
    const dto: CreateAssessmentDto = {
      title: 'Invalid',
      address: 'Test St',
      city: 'Tehran',
      province: 'Tehran',
      created_by: 999,
    };
    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
  });
});

it('should return all assessments', async () => {
  (prisma.assessment.findMany as jest.Mock).mockResolvedValue([{ id: 1 }]);
  const result = await service.findAll();
  expect(result).toEqual([{ id: 1 }]);
});

describe('findOne', () => {
  it('should return a single assessment', async () => {
    (prisma.assessment.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      deletedAt: null,
    });
    it('should return one assessment by id', async () => {
      const mockAssessment = { id: 1, title: 'Test', deletedAt: null };
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(
        mockAssessment,
      );
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
      it('should throw NotFoundException if not found', async () => {
        prisma.assessment.findUnique = jest.fn(() => null);
        await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
      });
    });

    describe('update', () => {
      it('should update successfully', async () => {
        prisma.assessment.findUnique = jest.fn(() => ({
          id: 1,
          created_by: 1,
          reference_code: 'abc',
          deletedAt: null,
        }));
        const dto: UpdateAssessmentDto = { title: 'Updated' };
        const result = await service.update(1, dto);
        expect(result).toEqual({ id: 1, ...dto, deletedAt: null });
      });
    });
  });
});