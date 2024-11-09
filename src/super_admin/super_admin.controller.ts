import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSuperAdminDto } from './dto/create-super_admin.dto';
import { SuperAdminService } from './super_admin.service';

@ApiTags('super-admin')
@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new SuperAdmin' })
  @ApiBody({
    type: CreateSuperAdminDto,
    description: 'The SuperAdmin registration object',
  })
  @ApiResponse({
    status: 201,
    description: 'SuperAdmin registered successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createSuperAdminDto: CreateSuperAdminDto) {
    return this.superAdminService.create(createSuperAdminDto);
  }
}
