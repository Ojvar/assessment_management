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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CreateCityDTO, UpdateCityDTO } from './dto';
import { City } from './entities/city.entity';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'City created', type: City })
  create(@Body() dto: CreateCityDTO): Promise<City> {
    return this.citiesService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List all cities', type: [City] })
  findAll(): Promise<City[]> {
    return this.citiesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'City found', type: City })
  @ApiResponse({ status: 404, description: 'City not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<City> {
    return this.citiesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'City updated', type: City })
  @ApiResponse({ status: 404, description: 'City not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCityDTO,
  ): Promise<City> {
    return this.citiesService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'City deleted', type: City })
  @ApiResponse({ status: 404, description: 'City not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<City> {
    return this.citiesService.remove(id);
  }
}
