import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProvinceDto } from './create-province.dto';

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {
  @ApiPropertyOptional({
    description: 'Name of the province',
    example: 'Tehran',
  })
  name?: string;

  constructor(partial: Partial<UpdateProvinceDto>) {
    super();
    Object.assign(this, partial);
  }
}
