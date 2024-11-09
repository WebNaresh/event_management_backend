import { ApiProperty } from '@nestjs/swagger';

export class Checkpoint {
  @ApiProperty({
    description: 'The unique identifier of the checkpoint',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the checkpoint',
    example: 'Checkpoint 1',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the checkpoint',
    example: 'This is the first checkpoint',
  })
  description: string;

  @ApiProperty({
    description: 'The latitude of the checkpoint location',
    example: 40.712776,
  })
  latitude: number;

  @ApiProperty({
    description: 'The longitude of the checkpoint location',
    example: -74.005974,
  })
  longitude: number;
}
