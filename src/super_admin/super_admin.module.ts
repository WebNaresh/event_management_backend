import { Module } from '@nestjs/common';
import { SuperAdminService } from './super_admin.service';
import { SuperAdminController } from './super_admin.controller';

@Module({
  controllers: [SuperAdminController],
  providers: [SuperAdminService],
})
export class SuperAdminModule {}
