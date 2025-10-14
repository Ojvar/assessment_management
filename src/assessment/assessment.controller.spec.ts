import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { Status } from '@prisma/client';

describe('AssessmentController', () => {
  let controller: AssessmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentController],
      providers: [
        {
          provide: AssessmentService,
          useValue: {
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
          },
        },
      ],
    }).compile();

    controller = module.get<AssessmentController>(AssessmentController);
    service = module.get<AssessmentService>(AssessmentService);
  });

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
