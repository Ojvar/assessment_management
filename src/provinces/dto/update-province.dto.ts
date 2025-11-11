import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProvinceDTO } from './create-province.dto';

export class UpdateProvinceDTO extends PartialType(CreateProvinceDTO) {
  @ApiPropertyOptional({
    description: 'Name of the province',
    example: 'Tehran',
  })
  name?: string;

  constructor(data: Partial<UpdateProvinceDTO>) {
    super();
    Object.assign(this, data);
  }
}
