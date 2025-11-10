import { Injectable, NotFoundException } from '@nestjs/common';
import { Province } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProvinceDTO, UpdateProvinceDTO } from './dto';

@Injectable()
export class ProvincesService {
  constructor(private prisma: PrismaService) {}

  // Create a province
  create(dto: CreateProvinceDTO): Promise<Province> {
    return this.prisma.province.create({
      data: { name: dto.name },
    });
  }

  // Get all provinces
  findAll(): Promise<Province[]> {
    return this.prisma.province.findMany();
  }

  // Get province by ID
  findOne(id: number): Promise<Province> {
    return this.prisma.province.findUniqueOrThrow({
      where: { id },
    });
  }

  // Update a province
  async update(id: number, dto: UpdateProvinceDTO): Promise<Province> {
    try {
      return await this.prisma.province.update({
        where: { id },
        data: dto,
      });
    } catch {
      throw new NotFoundException(`Province with ID ${id} not found`);
    }
  }

  // Delete a province
  async remove(id: number): Promise<Province> {
    try {
      return await this.prisma.province.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Province with ID ${id} not found`);
    }
  }
}
