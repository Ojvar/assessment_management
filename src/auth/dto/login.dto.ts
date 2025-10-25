import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmail } from 'class-validator/types/decorator/string/IsEmail';

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
