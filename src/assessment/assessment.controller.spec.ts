import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';

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
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AssessmentController>(AssessmentController);
    service = module.get<AssessmentService>(AssessmentService);
  });

  it('should call service.create on create()', async () => {
    (service.create as jest.Mock).mockResolvedValue({ id: 1 });
    const result = await controller.create({ name: 'test' } as any);
    expect(result).toEqual({ id: 1 });
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
    (service.update as jest.Mock).mockResolvedValue({ id: 1 });
    const result = await controller.update(1, { name: 'updated' } as any);
    expect(result).toEqual({ id: 1 });
  });

  it('should call service.remove on remove()', async () => {
    (service.remove as jest.Mock).mockResolvedValue({ id: 1 });
    const result = await controller.remove(1);
    expect(result).toEqual({ id: 1 });
  });
});
