import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import {
  CityDTO,
  CreateCityDTO,
  PaginationQueryDTO,
  UpdateCityDTO,
} from './dto';
import { City } from './entities/city.entity';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'City created', type: City })
  create(@Body() dto: CreateCityDTO): Promise<CityDTO> {
    return this.citiesService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 100 })
  @ApiOkResponse({
    description: 'List of cities with pagination',
    type: [CityDTO],
  })
  findAll(@Query() query: PaginationQueryDTO) {
    return this.citiesService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'City found', type: City })
  @ApiResponse({ status: 404, description: 'City not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CityDTO> {
    return this.citiesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'City updated', type: City })
  @ApiResponse({ status: 404, description: 'City not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCityDTO,
  ): Promise<CityDTO> {
    return this.citiesService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'City deleted', type: City })
  @ApiResponse({ status: 404, description: 'City not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<CityDTO> {
    return this.citiesService.remove(id);
  }
}
