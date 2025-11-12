import { Test, TestingModule } from '@nestjs/testing';
import { City } from '@prisma/client';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CreateCityDTO, UpdateCityDTO } from './dto';

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;

  const mockCity: City = {
    id: 1,
    name: 'Tehran',
    provinceId: 1,
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockCity),
    findAll: jest.fn().mockResolvedValue([mockCity]),
    findOne: jest.fn().mockResolvedValue(mockCity),
    update: jest.fn().mockResolvedValue(mockCity),
    remove: jest.fn().mockResolvedValue(mockCity),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [{ provide: CitiesService, useValue: mockService }],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a city', async () => {
    const dto: CreateCityDTO = { name: 'Tehran', provinceId: 1 };
    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockCity);
  });

  it('should return all cities', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockCity]);
  });

  it('should return a city by id', async () => {
    const result = await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockCity);
  });

  it('should update a city', async () => {
    const dto: UpdateCityDTO = { name: 'Tehran Updated', provinceId: 1 };
    const result = await controller.update(1, dto);
    expect(service.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(mockCity);
  });

  it('should remove a city', async () => {
    const result = await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockCity);
  });
});
