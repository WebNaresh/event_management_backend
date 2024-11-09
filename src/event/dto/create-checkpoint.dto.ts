import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCheckPointDto {
  @ApiProperty({
    example: 'Checkpoint Name',
    description: 'The name of the checkpoint',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
