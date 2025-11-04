/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDTO } from './dto';

describe('AssessmentController', () => {
  let controller: AssessmentController;
  let service: jest.Mocked<AssessmentService>;

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
    service = module.get(AssessmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create on create()', async () => {
    const dto: CreateAssessmentDTO = {
      title: 'Title',
      description: 'desc',
      province: 'Tehran',
      city: 'Tehran',
      address: 'Valiasr',
      zipCode: '12345',
    };

    service.create.mockResolvedValue({ id: 1, ...dto });

    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 1, ...dto });
  });

  // بقیه تست‌ها هم همین ساختار
});
