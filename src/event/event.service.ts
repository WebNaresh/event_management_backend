import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CreateCheckPointDto } from './dto/create-checkpoint.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}
  private events: Event[] = [];

  async create(createEventDto: CreateEventDto) {
    console.log(
      `🚀 ~ file: event.service.ts:12 ~ EventService ~ createEventDto:`,
      createEventDto,
    );
    await this.prisma.event.create({
      data: {
        title: createEventDto.title,
        description: createEventDto.description,
        date: new Date(createEventDto.date).toISOString(),
        location: createEventDto.location,
        userId: createEventDto.userId,
      },
    });
    return {
      message: 'Event has been successfully created',
    };
  }

  async findAll() {
    const events = await this.prisma.event.findMany();
    return {
      message: 'List of all events',
      data: events,
    };
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        checkPoints: true,
        user: true,
        security_person: true,
      },
    });
    return {
      message: 'The event with the given ID',
      data: event,
    };
  }

  async addCheckPoint(
    eventId: string,
    createCheckPointDto: CreateCheckPointDto,
  ) {
    await this.prisma.checkPoints.create({
      data: {
        name: createCheckPointDto.name,
        eventId: eventId,
      },
    });
    return {
      message: 'CheckPoint has been successfully added to the event',
    };
  }

  async delete(id: string) {
    await this.prisma.event.delete({
      where: { id },
    });
    return {
      message: 'Event has been successfully deleted',
    };
  }

  async get_security_person_events(user_id: string) {
    const events = await this.prisma.event.findMany({
      where: {
        security_person: {
          some: {
            userId: user_id,
          },
        },
      },
    });
    return {
      message: 'List of all events',
      data: events,
    };
  }

  async get_event_checkpoints(event_id: string) {
    const checkpoints = await this.prisma.checkPoints.findMany({
      where: {
        eventId: event_id,
      },
    });
    return {
      message: 'List of all checkpoints',
      data: checkpoints,
    };
  }
}
