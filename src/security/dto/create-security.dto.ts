import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateSecurityDto {
  @ApiProperty({
    description: 'First name of the security guard',
    example: 'Security',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the security guard', example: 1 })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Middle name of the security guard',
    required: false,
    example: 'Guard',
  })
  @IsString()
  @IsOptional()
  middleName?: string;

  @ApiProperty({
    description: 'Email of the security guard',
    example: 'security@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the security guard',
    example: 'Pass@123',
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
