// src/provinces/provinces.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Province } from '@prisma/client';
import { ProvincesService } from './provinces.service';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Post()
  async create(@Body('name') name: string): Promise<Province> {
    return this.provincesService.create(name);
  }

  @Get()
  async findAll(): Promise<Province[]> {
    return this.provincesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Province | null> {
    return this.provincesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
  ): Promise<Province> {
    return this.provincesService.update(id, name);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Province> {
    return this.provincesService.remove(id);
  }
}
