import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateCityDTO } from './create-city.dto';

export class UpdateCityDTO extends PartialType(CreateCityDTO) {
    @ApiProperty({ description: 'City name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Province ID' })
    @IsNumber()
    provinceId: number;

    constructor(data?: Partial<UpdateCityDTO>) {
        super()
        Object.assign(this, data);
    }
}
