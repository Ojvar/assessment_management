import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Assessment, Status, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';

jest.spyOn(console, 'error').mockImplementation(() => {}); // جلوگیری از لاگ اضافی

describe('AssessmentService', () => {
  let service: AssessmentService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const mockPrismaService: Partial<PrismaService> = {
      assessment: {
        create: jest.fn(
          ({ data }: { data: CreateAssessmentDto }): Assessment => ({
            id: 1,
            title: data.title,
            description: data.description ?? null,
            address: data.address ?? null,
            city: data.city ?? null,
            province: data.province ?? null,
            latitude: data.latitude ?? null,
            longitude: data.longitude ?? null,
            map_points: data.map_points ?? [],
            status: (data.status as Status) ?? Status.draft,
            reference_code: data.reference_code ?? 'abc',
            created_by: data.created_by,
            deletedAt: null,
          }),
        ),
        findMany: jest.fn((): Assessment[] => [{ id: 1 } as Assessment]),
        findUnique: jest.fn((): Assessment | null => null),
        update: jest.fn(
          ({
            where,
            data,
          }: {
            where: { id: number };
            data: Partial<CreateAssessmentDto>;
          }): Assessment =>
            ({
              id: where.id,
              ...data,
              deletedAt: null,
            }) as Assessment,
        ),
      },
      user: {
        findUnique: jest.fn(
          ({ where }: { where: { id: number } }): User | null =>
            ({
              id: where.id,
            }) as User,
        ),
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

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an assessment successfully', async () => {
      const dto: CreateAssessmentDto = {
        title: 'Test',
        address: 'Tehran St',
        city: 'Tehran',
        province: 'Tehran',
        created_by: 1,
      };
      const result = await service.create(dto);
      expect(result).toHaveProperty('id', 1);
      expect(result.title).toBe(dto.title);
    });

    it('should throw BadRequestException if user is invalid', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
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

  describe('findAll', () => {
    it('should return all assessments', async () => {
      const data = [{ id: 1 }, { id: 2 }];
      (prisma.assessment.findMany as jest.Mock).mockResolvedValue(data);
      const result = await service.findAll();
      expect(result).toEqual(data);
    });
  });

  describe('findOne', () => {
    it('returns one assessment', async () => {
      const assessment = { id: 1, deletedAt: null };
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(assessment);
      const result = await service.findOne(1);
      expect(result).toEqual(assessment);
    });

    it('throws if not found', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update successfully', async () => {
      (prisma.assessment.findUnique as jest.Mock)
        .mockResolvedValueOnce({ id: 1, reference_code: 'abc', created_by: 1 })
        .mockResolvedValueOnce(null); // check duplicate reference_code

      const dto = { latitude: 50 };
      const result = await service.update(1, dto);
      expect(result).toHaveProperty('latitude');
    });

    it('throws if assessment not found', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('soft deletes an assessment', async () => {
      const existing = { id: 1, deletedAt: null };
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(existing);
      (prisma.assessment.update as jest.Mock).mockResolvedValue({
        deletedAt: new Date(),
      });

      const result = await service.remove(1);
      expect(result).toHaveProperty('deletedAt');
    });

    it('throws if assessment not found', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
