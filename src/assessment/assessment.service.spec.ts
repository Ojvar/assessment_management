import { BadRequestException, NotFoundException } from '@nestjs/common';
<<<<<<< HEAD
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { Status, Assessment, User } from '@prisma/client';

jest.spyOn(console, 'error').mockImplementation(() => {}); // جلوگیری از لاگ اضافی
=======
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AssessmentService } from './assessment.service';
>>>>>>> 2cde43f (add: .vscode settings)

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

  // ================= CREATE =================
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
      (prisma.user.findUnique as jest.Mock).mockReturnValue(null);
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

  // ================= FIND ALL =================
  describe('findAll', () => {
    it('should return all assessments', async () => {
      const result = await service.findAll();
      expect(result).toEqual([{ id: 1 }]);
    });
  });

  // ================= FIND ONE =================
  describe('findOne', () => {
    it('should throw NotFoundException if not found', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockReturnValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  // ================= UPDATE =================
  describe('update', () => {
    it('should update successfully', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockReturnValue({
        id: 1,
        created_by: 1,
        reference_code: 'abc',
        deletedAt: null,
      });
      const dto: UpdateAssessmentDto = { title: 'Updated' };
      const result = await service.update(1, dto);
      expect(result).toMatchObject({
        id: 1,
        title: 'Updated',
        deletedAt: null,
      });
    });
  });

  // ================= REMOVE =================
  describe('remove', () => {
    it('should soft delete an assessment', async () => {
      (prisma.assessment.findUnique as jest.Mock).mockReturnValue({
        id: 1,
        deletedAt: null,
      });
      const result = await service.remove(1);
      expect(result.deletedAt).toBeDefined();
    });
  });
});
