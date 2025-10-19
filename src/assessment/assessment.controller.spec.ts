import { Test, TestingModule } from '@nestjs/testing';
import { Status } from '@prisma/client';
import { AssessmentController } from './assessment.controller';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

describe('AssessmentController', () => {
  let controller: AssessmentController;
  let service: AssessmentService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn((dto: CreateAssessmentDto) => ({
        id: 1,
        title: dto.title,
        description: dto.description ?? '',
        address: dto.address,
        city: dto.city,
        province: dto.province,
        latitude: dto.latitude,
        longitude: dto.longitude,
        map_points: dto.map_points ?? [],
        status: dto.status ?? Status.draft,
        reference_code: dto.reference_code ?? 'REF-12345',
        created_by: dto.created_by,
      })),
      findAll: jest.fn(() => [
        {
          id: 1,
          title: 'Test',
          description: '',
          address: 'Tehran St',
          city: 'Tehran',
          province: 'Tehran',
          latitude: 35.6892,
          longitude: 51.389,
          map_points: [],
          status: Status.draft,
          reference_code: 'REF-12345',
          created_by: 1,
        },
      ]),
      findOne: jest.fn((id: number) => ({
        id,
        title: 'Test',
        description: '',
        address: 'Tehran St',
        city: 'Tehran',
        province: 'Tehran',
        latitude: 35.6892,
        longitude: 51.389,
        map_points: [],
        status: Status.draft,
        reference_code: 'REF-12345',
        created_by: 1,
      })),
      update: jest.fn((id: number, dto: UpdateAssessmentDto) => ({
        id,
        title: dto.title ?? 'Old Title',
        description: dto.description ?? '',
        address: 'Tehran St',
        city: 'Tehran',
        province: 'Tehran',
        latitude: 35.6892,
        longitude: 51.389,
        map_points: [],
        status: dto.status ?? Status.draft,
        reference_code: 'REF-12345',
        created_by: 1,
      })),
      remove: jest.fn((id: number) => ({ id })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentController],
      providers: [{ provide: AssessmentService, useValue: mockService }],
    }).compile();

    controller = module.get<AssessmentController>(AssessmentController);
    service = module.get<AssessmentService>(AssessmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create on create', async () => {
    const dto: CreateAssessmentDto = {
      title: 'Test',
      address: 'Tehran St',
      city: 'Tehran',
      province: 'Tehran',
      created_by: 1,
    };

    const spy = jest.spyOn(service, 'create');
    await controller.create(dto);
    expect(spy).toHaveBeenCalledWith(dto);
  });

<<<<<<< HEAD
  it('should call service.create on create', async () => {
    const dto: CreateAssessmentDto = {
      title: 'Test',
      address: 'Tehran St',
      city: 'Tehran',
      province: 'Tehran',
      created_by: 1,
    };

    const spy = jest.spyOn(service, 'create');
    await controller.create(dto);
    expect(spy).toHaveBeenCalledWith(dto);
  });

  it('should call service.findAll on findAll', async () => {
    const spy = jest.spyOn(service, 'findAll');
    await controller.findAll();
    expect(spy).toHaveBeenCalled();
=======
  it('should call service.findAll on findAll', async () => {
    const spy = jest.spyOn(service, 'findAll');
    await controller.findAll();
    expect(spy).toHaveBeenCalled();
  });

  it('should call service.findOne on findOne', async () => {
    const spy = jest.spyOn(service, 'findOne');
    await controller.findOne(1);
    expect(spy).toHaveBeenCalledWith(1);
>>>>>>> 73c2881 (Fix error)
  });

  it('should call service.update on update', async () => {
    const dto: UpdateAssessmentDto = { title: 'Updated' };
    const spy = jest.spyOn(service, 'update');
    await controller.update(1, dto);
    expect(spy).toHaveBeenCalledWith(1, dto);
  });

<<<<<<< HEAD
  it('should call service.update on update', async () => {
    const dto: UpdateAssessmentDto = { title: 'Updated' };
    const spy = jest.spyOn(service, 'update');
    await controller.update(1, dto);
    expect(spy).toHaveBeenCalledWith(1, dto);
  });

=======
>>>>>>> 73c2881 (Fix error)
  it('should call service.remove on remove', async () => {
    const spy = jest.spyOn(service, 'remove');
    await controller.remove(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
