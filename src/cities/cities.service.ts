import { Injectable, NotFoundException } from '@nestjs/common';
import { City } from '@prisma/client';
import { EnumErrorType, throwError } from 'src/helpers/error.helper';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CityDTO,
  CreateCityDTO,
  PaginationQueryDTO,
  UpdateCityDTO,
} from './dto';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCityDTO): Promise<City> {
    return this.prisma.city.create({
      data: { name: dto.name, provinceId: dto.provinceId },
    });
  }

  async findAll(query: PaginationQueryDTO): Promise<CityDTO[]> {
    const {
      page = 1,
      limit = 100,
      search,
      sortBy = 'id',
      order = 'asc',
    } = query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const cities = await this.prisma.city.findMany({
      skip,
      take: limitNumber,
      where: search
        ? { name: { contains: search, mode: 'insensitive' } }
        : undefined,
      orderBy: { [sortBy]: order },
    });

    return cities.map((city) => ({
      id: city.id,
      name: city.name,
      provinceId: city.provinceId,
    }));
  }

  async findOne(id: number): Promise<CityDTO> {
    const city = await this.prisma.city.findUnique({
      where: { id },
    });
    if (!city) throw new NotFoundException(`City with ID ${id} not found`);
    return city;
  }

  async update(id: number, dto: UpdateCityDTO): Promise<CityDTO> {
    try {
      return await this.prisma.city.update({
        where: { id },
        data: dto,
      });
    } catch {
      throwError(EnumErrorType.NotFoundException);
    }
  }

  async remove(id: number): Promise<CityDTO> {
    try {
      return await this.prisma.city.delete({
        where: { id },
      });
    } catch {
      throwError(EnumErrorType.NotFoundException);
    }
  }
}
