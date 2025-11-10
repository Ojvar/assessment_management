// src/provinces/provinces.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Province } from '@prisma/client';
import { CreateProvinceDTO, UpdateProvinceDTO } from './dto';
import { ProvincesService } from './provinces.service';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) { }

  @Post()
  create(@Body() dto: CreateProvinceDTO): Promise<Province> {
    return this.provincesService.create(dto);
  }

  @Get()
  findAll(): Promise<Province[]> {
    return this.provincesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Province | null> {
    return this.provincesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProvinceDTO,
  ): Promise<Province> {
    return this.provincesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Province> {
    return this.provincesService.remove(id);
  }
}
