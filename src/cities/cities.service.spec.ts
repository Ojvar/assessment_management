import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CitiesService } from './cities.service';
import { CityDTO, PaginationQueryDTO } from './dto';

describe('CitiesService', () => {
  let service: CitiesService;
  let prisma: PrismaService;

  const mockCities = [
    { id: 1, name: 'Tehran', provinceId: 1 },
    { id: 2, name: 'Mashhad', provinceId: 2 },
    { id: 3, name: 'Isfahan', provinceId: 3 },
  ];

  const prismaMock = {
    city: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return paginated cities', async () => {
    prismaMock.city.findMany.mockResolvedValue(mockCities);

    const query: PaginationQueryDTO = { page: 1, limit: 2 };
    const result: CityDTO[] = await service.findAll(query);

    expect(prismaMock.city.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 2,
      where: undefined,
      orderBy: { id: 'asc' },
    });
    expect(result).toEqual(mockCities);
  });

  it('should apply search filter', async () => {
    prismaMock.city.findMany.mockResolvedValue([mockCities[0]]);

    const query: PaginationQueryDTO = { search: 'Tehran' };
    const result: CityDTO[] = await service.findAll(query);

    expect(prismaMock.city.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 100,
      where: { name: { contains: 'Tehran', mode: 'insensitive' } },
      orderBy: { id: 'asc' },
    });
    expect(result).toEqual([mockCities[0]]);
  });

  it('should apply sort', async () => {
    prismaMock.city.findMany.mockResolvedValue(mockCities);

    const query: PaginationQueryDTO = { sortBy: 'name', order: 'desc' };
    const result: CityDTO[] = await service.findAll(query);

    expect(prismaMock.city.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 100,
      where: undefined,
      orderBy: { name: 'desc' },
    });
    expect(result).toEqual(mockCities);
  });
});
