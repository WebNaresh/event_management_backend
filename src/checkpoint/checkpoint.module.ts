import { Module } from '@nestjs/common';
import { CheckpointController } from './checkpoint.controller';
import { CheckpointService } from './checkpoint.service';

@Module({
  controllers: [CheckpointController],
  providers: [CheckpointService],
})
export class CheckpointModule {}
