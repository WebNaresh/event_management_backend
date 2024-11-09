import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignSecurityDto } from './dto/assign-security.dto';
import { CreateSecurityDto } from './dto/create-security.dto';
import { SecurityService } from './security.service';

@ApiTags('security')
@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new security guard' })
  @ApiResponse({
    status: 201,
    description: 'The security guard has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createSecurityDto: CreateSecurityDto) {
    return this.securityService.create(createSecurityDto);
  }

  @Post('assign')
  @ApiOperation({ summary: 'Assign security guards to an event' })
  @ApiResponse({
    status: 200,
    description:
      'Security guards have been successfully assigned to the event.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  assignSecurityToEvent(@Body() assignSecurityDto: AssignSecurityDto) {
    return this.securityService.assignSecurityToEvent(
      assignSecurityDto.event_id,
      assignSecurityDto.user_ids,
    );
  }

  @Get(':event_id')
  @ApiOperation({ summary: 'Get security guards without assigned events' })
  @ApiResponse({
    status: 200,
    description: 'The security guards have been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'No security guards found.' })
  @ApiResponse({ status: 404, description: 'Security guard not found.' })
  @ApiParam({
    name: 'event_id',
    description: 'Event ID',
    example: '672e4c8a7e62815f544d78a5',
  })
  findOne(@Param('event_id') event_id: string) {
    return this.securityService.findMany(event_id);
  }
}
