import { Test, TestingModule } from '@nestjs/testing';
import { City } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CitiesService } from './cities.service';
import { CreateCityDTO, UpdateCityDTO } from './dto';

describe('CitiesService', () => {
  let service: CitiesService;
  let prisma: PrismaService;

  const mockCity: City = {
    id: 1,
    name: 'Tehran',
    provinceId: 1,
  };

  const mockPrisma = {
    city: {
      create: jest.fn().mockResolvedValue(mockCity),
      findMany: jest.fn().mockResolvedValue([mockCity]),
      findUnique: jest.fn().mockResolvedValue(mockCity),
      update: jest.fn().mockResolvedValue(mockCity),
      delete: jest.fn().mockResolvedValue(mockCity),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a city', async () => {
    const dto: CreateCityDTO = { name: 'Tehran', provinceId: 1 };
    const result = await service.create(dto);
    expect(prisma.city.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(mockCity);
  });

  it('should return all cities', async () => {
    const result = await service.findAll();
    expect(prisma.city.findMany).toHaveBeenCalled();
    expect(result).toEqual([mockCity]);
  });

  it('should return a city by id', async () => {
    const result = await service.findOne(1);
    expect(prisma.city.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockCity);
  });

  it('should update a city', async () => {
    const dto: UpdateCityDTO = { name: 'Tehran Updated', provinceId: 1 };
    const result = await service.update(1, dto);
    expect(prisma.city.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: dto,
    });
    expect(result).toEqual(mockCity);
  });

  it('should remove a city', async () => {
    const result = await service.remove(1);
    expect(prisma.city.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockCity);
  });
});
