import { Injectable } from '@nestjs/common';
import { EnumErrorType, throwError } from 'src/helpers';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProvinceDTO, ProvinceDTO, UpdateProvinceDTO } from './dto';

@Injectable()
export class ProvincesService {
  constructor(private prisma: PrismaService) { }

  // Create a province
  create(dto: CreateProvinceDTO): Promise<ProvinceDTO> {
    return this.prisma.province.create({
      data: { name: dto.name },
    });
  }

  // Get all provinces
  findAll(): Promise<ProvinceDTO[]> {
    return this.prisma.province.findMany();
  }

  // Get province by ID
  findOne(id: number): Promise<ProvinceDTO> {
    return this.prisma.province.findUniqueOrThrow({
      where: { id },
    });
  }

  // Update a province
  async update(id: number, dto: UpdateProvinceDTO): Promise<ProvinceDTO> {
    try {
      return await this.prisma.province.update({
        where: { id },
        data: dto,
      });
    } catch {
      throwError(EnumErrorType.NotFoundException);
    }
  }

  // Delete a province
  async remove(id: number): Promise<ProvinceDTO> {
    try {
      return await this.prisma.province.delete({
        where: { id },
      });
    } catch {
      throwError(EnumErrorType.NotFoundException);
    }
  }
}
