import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProvinceDTO, UpdateProvinceDTO } from './dto';
import { ProvincesService } from './provinces.service';

describe('ProvincesService', () => {
  let service: ProvincesService;
  let prismaService: {
    province: {
      create: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  const mockProvince = {
    id: 1,
    name: 'Tehran',
  };

  const mockProvinces = [
    { id: 1, name: 'Tehran' },
    { id: 2, name: 'Isfahan' },
    { id: 3, name: 'Shiraz' },
  ];

  beforeEach(async () => {
    prismaService = {
      province: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvincesService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
    }).compile();

    service = module.get<ProvincesService>(ProvincesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a province', async () => {
      const dto: CreateProvinceDTO = { name: 'Tehran' };
      prismaService.province.create.mockResolvedValue(mockProvince);

      const result = await service.create(dto);

      expect(prismaService.province.create).toHaveBeenCalledWith({
        data: { name: dto.name },
      });
      expect(result).toEqual(mockProvince);
    });

    it('should create a province with different name', async () => {
      const dto: CreateProvinceDTO = { name: 'Isfahan' };
      const newProvince = { id: 2, name: dto.name };
      prismaService.province.create.mockResolvedValue(newProvince);

      const result = await service.create(dto);

      expect(prismaService.province.create).toHaveBeenCalledWith({
        data: { name: dto.name },
      });
      expect(result).toEqual(newProvince);
    });
  });

  describe('findAll', () => {
    it('should return an array of provinces', async () => {
      prismaService.province.findMany.mockResolvedValue(mockProvinces);

      const result = await service.findAll();

      expect(prismaService.province.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockProvinces);
      expect(result).toHaveLength(3);
    });

    it('should return an empty array when no provinces exist', async () => {
      prismaService.province.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(prismaService.province.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return a province by id', async () => {
      const id = 1;
      prismaService.province.findUnique.mockResolvedValue(mockProvince);

      const result = await service.findOne(id);

      expect(prismaService.province.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockProvince);
    });

    it('should return null when province does not exist', async () => {
      const id = 999;
      prismaService.province.findUnique.mockResolvedValue(null);

      const result = await service.findOne(id);

      expect(prismaService.province.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a province', async () => {
      const id = 1;
      const dto: UpdateProvinceDTO = { name: 'Tehran Updated' };
      const updatedProvince = { id, name: dto.name! };
      prismaService.province.update.mockResolvedValue(updatedProvince);

      const result = await service.update(id, dto);

      expect(prismaService.province.update).toHaveBeenCalledWith({
        where: { id },
        data: dto,
      });
      expect(result).toEqual(updatedProvince);
    });

    it('should update a province with different id', async () => {
      const id = 2;
      const dto: UpdateProvinceDTO = { name: 'Isfahan Updated' };
      const updatedProvince = { id, name: dto.name! };
      prismaService.province.update.mockResolvedValue(updatedProvince);

      const result = await service.update(id, dto);

      expect(prismaService.province.update).toHaveBeenCalledWith({
        where: { id },
        data: dto,
      });
      expect(result).toEqual(updatedProvince);
    });
  });

  describe('remove', () => {
    it('should delete a province', async () => {
      const id = 1;
      prismaService.province.delete.mockResolvedValue(mockProvince);

      const result = await service.remove(id);

      expect(prismaService.province.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockProvince);
    });

    it('should delete a province with different id', async () => {
      const id = 2;
      const provinceToDelete = { id: 2, name: 'Isfahan' };
      prismaService.province.delete.mockResolvedValue(provinceToDelete);

      const result = await service.remove(id);

      expect(prismaService.province.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(provinceToDelete);
    });
  });
});
