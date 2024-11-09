import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Event Name', description: 'The name of the event' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Event Description',
    description: 'The description of the event',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: 'The date of the event',
  })
  @IsISO8601()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    example: 'Event Location',
    description: 'The location of the event',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: '672e450783419ef524a5d10e',
    description: 'The user id of the event creator',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
