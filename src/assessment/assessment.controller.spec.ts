import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
<<<<<<< HEAD
import { PrismaService } from '../prisma/prisma.service';
=======
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { Status } from '@prisma/client';
>>>>>>> bbc896e (Fix linter errors)

describe('AssessmentController', () => {
  let controller: AssessmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentController],
      providers: [
        AssessmentService,
        {
          provide: PrismaService,
          useValue: {
<<<<<<< HEAD
            assessment: {},
            user: {},
=======
            create: jest.fn((dto: CreateAssessmentDto) => ({
              id: 1,
              title: dto.title,
              address: dto.address,
              city: dto.city,
              province: dto.province,
              created_by: dto.created_by,
              status: dto.status ?? Status.draft,
            })),
            findAll: jest.fn(() => [{ id: 1 }]),
            findOne: jest.fn((id: number) => ({ id })),
            update: jest.fn((id: number, dto: UpdateAssessmentDto) => ({
              id,
              ...dto,
            })),
            remove: jest.fn((id: number) => ({ id })),
>>>>>>> bbc896e (Fix linter errors)
          },
        },
      ],
    }).compile();

    controller = module.get<AssessmentController>(AssessmentController);
    service = module.get<AssessmentService>(AssessmentService);
  });

<<<<<<< HEAD
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create', async () => {
      const dto = { title: 'New', created_by: 1 } as any;
      const result = { id: 1, title: 'New' };
      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      expect(await controller.create(dto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll', async () => {
      const result = [{ id: 1 }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should call service.findOne', async () => {
      const result = { id: 1 };
      jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

      expect(await controller.findOne(1)).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call service.update', async () => {
      const dto = { title: 'Updated' } as any;
      const result = { id: 1, title: 'Updated' };
      jest.spyOn(service, 'update').mockResolvedValue(result as any);

      expect(await controller.update(1, dto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should call service.remove', async () => {
      const result = { id: 1, deletedAt: new Date() };
      jest.spyOn(service, 'remove').mockResolvedValue(result as any);

      expect(await controller.remove(1)).toBe(result);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
=======
  it('should call service.create on create()', async () => {
    const dto: CreateAssessmentDto = {
      title: 'Test',
      address: 'Tehran St',
      city: 'Tehran',
      province: 'Tehran',
      created_by: 1,
    };
    const result = await controller.create(dto);
    expect(result).toHaveProperty('id');
    expect(result.title).toBe(dto.title);
  });

  it('should call service.findAll on findAll()', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1 }]);
  });

  it('should call service.findOne on findOne()', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({ id: 1 });
  });

  it('should call service.update on update()', async () => {
    const dto: UpdateAssessmentDto = { title: 'Updated' };
    const result = await controller.update(1, dto);
    expect(result).toEqual({ id: 1, ...dto });
  });

  it('should call service.remove on remove()', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ id: 1 });
>>>>>>> bbc896e (Fix linter errors)
  });
});
