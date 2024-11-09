import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCheckPointDto } from './dto/create-checkpoint.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { EventService } from './event.service';

@ApiTags('events')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Create event' })
  @ApiResponse({
    status: 201,
    description: 'The event has been successfully created.',
    type: Event,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({
    status: 200,
    description: 'List of all events',
    type: [Event],
  })
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':event_id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiResponse({
    status: 200,
    description: 'The event with the given ID',
    type: Event,
  })
  @ApiParam({
    name: 'event_id',
    description: 'Event ID',
    example: '672e4c8a7e62815f544d78a5',
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  findOne(@Param('event_id') event_id: string) {
    return this.eventService.findOne(event_id);
  }

  @Post(':event_id/checkpoints')
  @ApiOperation({ summary: 'Add checkpoint to event' })
  @ApiResponse({
    status: 201,
    description: 'The checkpoint has been successfully added to the event.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  addCheckPoint(
    @Param('event_id') event_id: string,
    @Body() createCheckPointDto: CreateCheckPointDto,
  ) {
    return this.eventService.addCheckPoint(event_id, createCheckPointDto);
  }

  @Delete(':event_id')
  @ApiOperation({ summary: 'Delete event by ID' })
  @ApiResponse({
    status: 200,
    description: 'The event has been successfully deleted.',
  })
  @ApiParam({
    name: 'event_id',
    description: 'Event ID',
    example: '672e4c8a7e62815f544d78a5',
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  delete(@Param('event_id') event_id: string) {
    return this.eventService.delete(event_id);
  }

  @Get('security-person/:user_id')
  @ApiOperation({ summary: 'Get events assigned to security person' })
  @ApiResponse({
    status: 200,
    description: 'The events have been successfully retrieved.',
    type: [Event],
  })
  @ApiParam({
    name: 'user_id',
    description: 'User ID',
    example: '672e4c8a7e62815f544d78a5',
  })
  @ApiResponse({ status: 404, description: 'No events found.' })
  getSecurityPersonEvents(@Param('user_id') user_id: string) {
    return this.eventService.get_security_person_events(user_id);
  }

  @Get(':event_id/checkpoints')
  @ApiOperation({ summary: 'Get checkpoints of an event' })
  @ApiResponse({
    status: 200,
    description: 'The checkpoints have been successfully retrieved.',
  })
  @ApiParam({
    name: 'event_id',
    description: 'Event ID',
    example: '672e4c8a7e62815f544d78a5',
  })
  @ApiResponse({ status: 404, description: 'No checkpoints found.' })
  getEventCheckpoints(@Param('event_id') event_id: string) {
    return this.eventService.get_event_checkpoints(event_id);
  }

  @Get(`:event_id/register/:user_id`)
  @ApiOperation({ summary: 'Register for an event' })
  @ApiResponse({
    status: 200,
    description: 'You have been successfully registered for the event.',
  })
  @ApiParam({
    name: 'event_id',
    description: 'Event ID',
    example: '672ec7d48d2214936a6c7951',
  })
  @ApiParam({
    name: 'user_id',
    description: 'User ID',
    example: '672f0588e79b94f0e5b4eb43',
  })
  registerForEvent(
    @Param('event_id') event_id: string,
    @Param('user_id') user_id: string,
  ) {
    return this.eventService.register_for_event(event_id, user_id);
  }
}
