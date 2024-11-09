import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AssignSecurityDto {
  @ApiProperty({
    description: 'Event ID',
    example: '672e4c8a7e62815f544d78a5',
  })
  @IsString()
  @IsNotEmpty()
  event_id: string;

  @ApiProperty({
    description: 'Array of user IDs to be assigned as security guards',
    example: ['672e7e7b95603e126fe5a230', '672e7fe195603e126fe5a232'],
  })
  @IsArray()
  @IsNotEmpty()
  user_ids: string[];
}
