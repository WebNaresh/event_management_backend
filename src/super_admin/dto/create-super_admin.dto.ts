import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSuperAdminDto {
  @ApiProperty({
    example: 'sa@gmail.com',
    description: 'The email of the SuperAdmin',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'Pass@123',
    description: 'The password of the SuperAdmin',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'Super',
    description: 'The first name of the SuperAdmin',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Man',
    description: 'The last name of the SuperAdmin',
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'Admin',
    description: 'The middle name of the SuperAdmin',
  })
  @IsString()
  middle_name: string;
}
