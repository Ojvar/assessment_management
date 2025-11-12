import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Province } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProvinceDTO, UpdateProvinceDTO } from './dto';
import { ProvincesService } from './provinces.service';

describe('ProvincesService', () => {
  let service: ProvincesService;
  let prismaService: PrismaService;
  let provinceMock: {
    create: jest.Mock;
    findMany: jest.Mock;
    findUniqueOrThrow: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvincesService,
        {
          provide: PrismaService,
          useValue: {
            province: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProvincesService>(ProvincesService);
    prismaService = module.get<PrismaService>(PrismaService);
    provinceMock = prismaService.province as unknown as typeof provinceMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a province', async () => {
    const createProvinceDto: CreateProvinceDTO = { name: 'New Province' };
    const createdProvince: Province = {
      id: 1,
      name: 'New Province',
    } as Province;

    provinceMock.create.mockResolvedValue(createdProvince);

    const result = await service.create(createProvinceDto);
    expect(result).toEqual(createdProvince);
  });

  it('should return all provinces', async () => {
    const provinces: Province[] = [
      { id: 1, name: 'Province 1' } as Province,
      { id: 2, name: 'Province 2' } as Province,
    ];

    provinceMock.findMany.mockResolvedValue(provinces);

    const result = await service.findAll();
    expect(result).toEqual(provinces);
  });

  it('should return a province by id', async () => {
    const province: Province = { id: 1, name: 'Province 1' } as Province;

    provinceMock.findUniqueOrThrow.mockResolvedValue(province);

    const result = await service.findOne(1);
    expect(result).toEqual(province);
  });

  it('should propagate error if province not found on findOne', async () => {
    provinceMock.findUniqueOrThrow.mockRejectedValue(new Error('Not found'));

    await expect(service.findOne(999)).rejects.toThrow('Not found');
  });

  it('should update a province', async () => {
    const updateDto: UpdateProvinceDTO = { name: 'Updated Province' };
    const updatedProvince: Province = {
      id: 1,
      name: 'Updated Province',
    } as Province;

    provinceMock.update.mockResolvedValue(updatedProvince);

    const result = await service.update(1, updateDto);
    expect(result).toEqual(updatedProvince);
  });

  it('should throw NotFoundException if province not found on update', async () => {
    const updateDto: UpdateProvinceDTO = { name: 'Updated Province' };

    provinceMock.update.mockRejectedValue(new Error('Not found'));

    await expect(service.update(999, updateDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should delete a province', async () => {
    const provinceToDelete: Province = {
      id: 1,
      name: 'Province to Delete',
    } as Province;

    provinceMock.delete.mockResolvedValue(provinceToDelete);

    const result = await service.remove(1);
    expect(result).toEqual(provinceToDelete);
  });

  it('should throw NotFoundException if province not found on delete', async () => {
    provinceMock.delete.mockRejectedValue(new Error('Not found'));

    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
