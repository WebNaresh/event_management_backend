import { Injectable } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateSecurityDto } from './dto/create-security.dto';

@ApiTags('security')
@Injectable()
export class SecurityService {
  constructor(
    private prisma: PrismaService,
    private readonly bcrypt: BcryptService,
  ) {}

  @ApiOperation({ summary: 'Create a new security guard' })
  @ApiResponse({
    status: 201,
    description: 'The security guard has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(createSecurityDto: CreateSecurityDto) {
    const password = await this.bcrypt.hashPassword(createSecurityDto.password);
    return this.prisma.user.create({
      data: {
        first_name: createSecurityDto.firstName,
        last_name: createSecurityDto.lastName,
        middle_name: createSecurityDto.middleName,
        email: createSecurityDto.email,
        password,
        role: 'SECURITY',
      },
    });
  }

  @ApiOperation({ summary: 'Get security guards without assigned events' })
  @ApiResponse({
    status: 200,
    description: 'The security guards have been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'No security guards found.' })
  async findMany(event_id: string) {
    return this.prisma.user.findMany({
      where: {
        role: 'SECURITY',
        events_security_asigned: {
          none: {
            eventId: event_id,
          },
        },
      },
    });
  }

  @ApiOperation({ summary: 'Assign security guards to an event' })
  @ApiResponse({
    status: 200,
    description:
      'Security guards have been successfully assigned to the event.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async assignSecurityToEvent(event_id: string, user_ids: string[]) {
    const assignments = user_ids.map((user_id) => ({
      eventId: event_id,
      userId: user_id,
    }));

    // Use createMany to insert multiple entries at once in EventSecurityAssignment
    await this.prisma.eventSecurityAssignment.createMany({
      data: assignments,
    });

    return {
      message: 'Security guards have been successfully assigned to the event.',
    };
  }
}
