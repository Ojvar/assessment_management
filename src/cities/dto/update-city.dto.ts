import { PartialType } from '@nestjs/swagger';
import { CreateCityDTO } from './create-city.dto';

export class UpdateCityDTO extends PartialType(CreateCityDTO) {
    constructor(data?: Partial<UpdateCityDTO>) {
        super();
        Object.assign(this, data);
    }
}
