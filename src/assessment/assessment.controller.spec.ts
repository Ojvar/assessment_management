import { Test, TestingModule } from '@nestjs/testing';
import { Status } from '@prisma/client';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
<<<<<<< HEAD
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

=======
>>>>>>> e7c83e7 (Squashed commit of the following:)

describe('AssessmentController', () => {
  let controller: AssessmentController;
  let service: AssessmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentController],
      providers: [
        {
          provide: AssessmentService,
          useValue: {
<<<<<<< HEAD
            assessment: {},
            user: {},
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
=======
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
>>>>>>> e7c83e7 (Squashed commit of the following:)
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

  it('should call service.create', async () => {
    const dto = { title: 'New', created_by: 1 } as any;
    const result = { id: 1, title: 'New' };
    jest.spyOn(service, 'create').mockResolvedValue(result as any);

    expect(await controller.create(dto)).toBe(result);
    expect(service.create).toHaveBeenCalledWith(dto);
=======
  it('should call service.create on create()', async () => {
    (service.create as jest.Mock).mockResolvedValue({ id: 1, title: 'Test' });
    const result = await controller.create({ title: 'Test', created_by: 1 } as any);
    expect(result).toEqual({ id: 1, title: 'Test' });
>>>>>>> e7c83e7 (Squashed commit of the following:)
  });

  it('should call service.findAll on findAll()', async () => {
    (service.findAll as jest.Mock).mockResolvedValue([{ id: 1 }]);
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1 }]);
  });

  it('should call service.findOne on findOne()', async () => {
    (service.findOne as jest.Mock).mockResolvedValue({ id: 1 });
    const result = await controller.findOne(1);
    expect(result).toEqual({ id: 1 });
  });

  it('should call service.update on update()', async () => {
<<<<<<< HEAD
    (service.update as jest.Mock).mockResolvedValue({ id: 1 });
    const result = await controller.update(1, { name: 'updated' } as any);
    expect(result).toEqual({ id: 1 });
=======
    (service.update as jest.Mock).mockResolvedValue({ id: 1, title: 'Updated' });
    const result = await controller.update(1, { title: 'Updated' } as any);
    expect(result).toEqual({ id: 1, title: 'Updated' });
>>>>>>> e7c83e7 (Squashed commit of the following:)
  });

  it('should call service.remove on remove()', async () => {
    (service.remove as jest.Mock).mockResolvedValue({ id: 1 });
    const result = await controller.remove(1);
    expect(result).toEqual({ id: 1 });

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
    });
  });
});