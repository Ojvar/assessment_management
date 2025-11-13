import { Injectable, NotFoundException } from '@nestjs/common';
import { City } from '@prisma/client';
import { EnumErrorType, throwError } from 'src/helpers/error.helper';
import { PrismaService } from 'src/prisma/prisma.service';
import { CityDTO, CreateCityDTO, UpdateCityDTO } from './dto';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) { }

  create(dto: CreateCityDTO): Promise<City> {
    return this.prisma.city.create({
      data: { name: dto.name, provinceId: dto.provinceId },
    });
  }

  findAll(): Promise<CityDTO[]> {
    return this.prisma.city.findMany();
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
      throwError(EnumErrorType.NotFoundException)
    }
  }

  async remove(id: number): Promise<CityDTO> {
    try {
      return await this.prisma.city.delete({
        where: { id },
      });
    } catch {
      throwError(EnumErrorType.NotFoundException)
    }
  }
}
