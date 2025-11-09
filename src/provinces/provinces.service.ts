// src/provinces/provinces.service.ts
import { Injectable } from '@nestjs/common';
import { Province } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProvincesService {
  constructor(private prisma: PrismaService) {}

  // Create a province
  async create(name: string): Promise<Province> {
    return this.prisma.province.create({
      data: { name },
    });
  }

  // Get all provinces
  async findAll(): Promise<Province[]> {
    return this.prisma.province.findMany();
  }

  // Get province by ID
  async findOne(id: number): Promise<Province | null> {
    return this.prisma.province.findUnique({
      where: { id },
    });
  }

  // Update a province
  async update(id: number, name: string): Promise<Province> {
    return this.prisma.province.update({
      where: { id },
      data: { name },
    });
  }

  // Delete a province
  async remove(id: number): Promise<Province> {
    return this.prisma.province.delete({
      where: { id },
    });
  }
}
