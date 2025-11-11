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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProvinceDTO, ProvinceDTO, UpdateProvinceDTO } from './dto';
import { Province } from './entities/province.entity';
import { ProvincesService } from './provinces.service';

@ApiTags('Provinces') // Used to categorize the endpoints in Swagger UI
@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new province' })
  @ApiResponse({
    status: 201,
    description: 'Province successfully created',
    type: Province,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  create(@Body() dto: CreateProvinceDTO): Promise<ProvinceDTO> {
    return this.provincesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all provinces' })
  @ApiResponse({
    status: 200,
    description: 'List of all provinces',
    type: [Province],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  findAll(): Promise<ProvinceDTO[]> {
    return this.provincesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a province by ID' })
  @ApiResponse({
    status: 200,
    description: 'Province details by ID',
    type: Province,
  })
  @ApiResponse({
    status: 404,
    description: 'Province not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProvinceDTO | null> {
    return this.provincesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update province details by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the province',
    type: Province,
  })
  @ApiResponse({
    status: 404,
    description: 'Province not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid data',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProvinceDTO,
  ): Promise<ProvinceDTO> {
    return this.provincesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a province by ID' })
  @ApiResponse({
    status: 200,
    description: 'Province successfully deleted',
    type: ProvinceDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Province not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<ProvinceDTO> {
    return this.provincesService.remove(id);
  }
}
