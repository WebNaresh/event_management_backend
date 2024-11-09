import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    example: 'User',
    description: 'The first name of the user',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'One',
    description: 'The last name of the user',
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'Main',
    description: 'The middle name of the user',
  })
  @IsString()
  middle_name: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Pass@123',
    description: 'The password of the user',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
