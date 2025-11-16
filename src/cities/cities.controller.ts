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
import { ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import {
  CityDTO,
  CreateCityDTO,
  PaginationQueryDTO,
  UpdateCityDTO,
} from './dto';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new city' })
  @ApiResponse({
    status: 201,
    description: 'City created',
    type: CityDTO,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({
    status: 409,
    description:
      'City with the same name already exists in the specified province',
  })
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
  @ApiOperation({ summary: 'Get paginated cities' })
  @ApiResponse({ status: 200, type: CityDTO })
  findAll(@Query() query: PaginationQueryDTO) {
    return this.citiesService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'City found', type: CityDTO })
  @ApiResponse({ status: 404, description: 'City not found' })
  @ApiOperation({ summary: 'Get a city by id' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CityDTO> {
    return this.citiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a city' })
  @ApiResponse({ status: 200, description: 'Update a City', type: CityDTO })
  @ApiResponse({ status: 404, description: 'City not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCityDTO,
  ): Promise<CityDTO> {
    return this.citiesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a city' })
  @ApiResponse({ status: 200, description: 'City deleted', type: CityDTO })
  @ApiResponse({ status: 404, description: 'City not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<CityDTO> {
    return this.citiesService.remove(id);
  }
}
