import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDTO {
  @ApiProperty({
    description: 'JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;
}
