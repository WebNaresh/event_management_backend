import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckpointService } from './checkpoint.service';
import { Checkpoint } from './entities/checkpoint.entity';

@ApiTags('checkpoint')
@Controller('checkpoint')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}

  @ApiOperation({ summary: 'Get a checkpoint by ID' })
  @ApiResponse({
    status: 200,
    description: 'Checkpoint found',
    type: Checkpoint,
  })
  @ApiParam({
    name: 'checkpoint_id',
    description: 'The unique identifier of the checkpoint',
    example: '672e62643e7946513e53f4f5',
  })
  @ApiResponse({ status: 404, description: 'Checkpoint not found' })
  @Get(':checkpoint_id')
  findOne(@Param('checkpoint_id') checkpoint_id: string) {
    return this.checkpointService.findOne(checkpoint_id);
  }

  @ApiOperation({ summary: 'Add a user to a checkpoint' })
  @ApiResponse({ status: 200, description: 'User added to checkpoint' })
  @ApiParam({
    name: 'checkpoint_id',
    description: 'The unique identifier of the checkpoint',
    example: '672ec84b8d2214936a6c7955',
  })
  @ApiParam({
    name: 'user_id',
    description: 'The unique identifier of the user',
    example: '672e450783419ef524a5d10e',
  })
  @ApiResponse({ status: 404, description: 'Checkpoint not found' })
  @Get(':checkpoint_id/user/:user_id')
  addUserToCheckpoint(
    @Param('checkpoint_id') checkpoint_id: string,
    @Param('user_id') user_id: string,
  ) {
    return this.checkpointService.addUserToCheckpoint(checkpoint_id, user_id);
  }
}
