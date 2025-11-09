/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProvinceDto, UpdateProvinceDto } from './dto';
import { ProvincesController } from './provinces.controller';
import { ProvincesService } from './provinces.service';

describe('ProvincesController', () => {
  let controller: ProvincesController;
  let service: jest.Mocked<ProvincesService>;

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
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvincesController],
      providers: [
        {
          provide: ProvincesService,
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

    controller = module.get<ProvincesController>(ProvincesController);
    service = module.get(ProvincesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a province', async () => {
      const dto: CreateProvinceDto = { name: 'Tehran' };
      service.create.mockResolvedValue(mockProvince);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockProvince);
    });

    it('should create a province with different name', async () => {
      const dto: CreateProvinceDto = { name: 'Isfahan' };
      const newProvince = { id: 2, name: dto.name };
      service.create.mockResolvedValue(newProvince);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(newProvince);
    });
  });

  describe('findAll', () => {
    it('should return an array of provinces', async () => {
      service.findAll.mockResolvedValue(mockProvinces);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockProvinces);
      expect(result).toHaveLength(3);
    });

    it('should return an empty array when no provinces exist', async () => {
      service.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    it('should return a province by id', async () => {
      const id = 1;
      service.findOne.mockResolvedValue(mockProvince);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockProvince);
    });

    it('should return null when province does not exist', async () => {
      const id = 999;
      service.findOne.mockResolvedValue(null);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a province', async () => {
      const id = 1;
      const dto: UpdateProvinceDto = { name: 'Tehran Updated' };
      const updatedProvince = { id, name: dto.name! };
      service.update.mockResolvedValue(updatedProvince);

      const result = await controller.update(id, dto);

      expect(service.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(updatedProvince);
    });

    it('should update a province with different id', async () => {
      const id = 2;
      const dto: UpdateProvinceDto = { name: 'Isfahan Updated' };
      const updatedProvince = { id, name: dto.name! };
      service.update.mockResolvedValue(updatedProvince);

      const result = await controller.update(id, dto);

      expect(service.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(updatedProvince);
    });
  });

  describe('remove', () => {
    it('should delete a province', async () => {
      const id = 1;
      service.remove.mockResolvedValue(mockProvince);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockProvince);
    });

    it('should delete a province with different id', async () => {
      const id = 2;
      const provinceToDelete = { id: 2, name: 'Isfahan' };
      service.remove.mockResolvedValue(provinceToDelete);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(provinceToDelete);
    });
  });
});
