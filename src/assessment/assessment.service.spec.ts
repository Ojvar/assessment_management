import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentService } from './assessment.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { Status, Assessment, User } from '@prisma/client';

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

  describe('findAll', () => {
    it('should return all assessments', async () => {
      const result = await service.findAll();
      expect(result).toEqual([{ id: 1 }]);
    });
  });

  describe('findOne', () => {
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
      expect(result).toMatchObject({
        id: 1,
        title: 'Updated',
        deletedAt: null,
      });
    });
  });
});
