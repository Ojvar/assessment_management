import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CityDTO,
  CreateCityDTO,
  PaginationQueryDTO,
  UpdateCityDTO,
} from './dto';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateCityDTO): Promise<CityDTO> {
    const city = await this.prisma.city.create({
      data: dto,
    });

    return new CityDTO(city);
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

    return cities.map((c) => new CityDTO(c));

  }

  async findOne(id: number): Promise<CityDTO> {
    const city = await this.prisma.city.findUniqueOrThrow({ where: { id } });

    return new CityDTO(city);
  }



  async update(id: number, dto: UpdateCityDTO): Promise<CityDTO> {
    const city = await this.prisma.city.update({
      where: { id },
      data: dto,
    });

    return new CityDTO(city);
  }

  async remove(id: number): Promise<CityDTO> {
    const city = await this.prisma.city.delete({
      where: { id },
    });

    return new CityDTO(city);
  }
}
