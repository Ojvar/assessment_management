import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AssessmentController', () => {
  let controller: AssessmentController;
  let service: AssessmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentController],
      providers: [
        AssessmentService,
        {
          provide: PrismaService,
          useValue: {
            assessment: {},
            user: {},
          },
        },
      ],
    }).compile();

    controller = module.get<AssessmentController>(AssessmentController);
    service = module.get<AssessmentService>(AssessmentService);
  });

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
  });
});
