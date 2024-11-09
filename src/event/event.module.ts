import { Module } from '@nestjs/common';
import { CreateCheckPointDto } from './dto/create-checkpoint.dto'; // Import the DTO
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [CreateCheckPointDto],
})
export class EventModule {}
