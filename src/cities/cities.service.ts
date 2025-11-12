import { Injectable, NotFoundException } from '@nestjs/common';
import { City } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCityDTO, UpdateCityDTO } from './dto';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateCityDTO): Promise<City> {
    return this.prisma.city.create({
      data: { name: dto.name, provinceId: dto.provinceId },
    });
  }

  findAll(): Promise<City[]> {
    return this.prisma.city.findMany();
  }

  async findOne(id: number): Promise<City> {
    const city = await this.prisma.city.findUnique({
      where: { id },
    });
    if (!city) throw new NotFoundException(`City with ID ${id} not found`);
    return city;
  }

  async update(id: number, dto: UpdateCityDTO): Promise<City> {
    try {
      return await this.prisma.city.update({
        where: { id },
        data: dto,
      });
    } catch {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
  }

  async remove(id: number): Promise<City> {
    try {
      return await this.prisma.city.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
  }
}
