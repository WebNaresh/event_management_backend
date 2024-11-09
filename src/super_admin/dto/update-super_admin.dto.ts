import { PartialType } from '@nestjs/swagger';
import { CreateSuperAdminDto } from './create-super_admin.dto';

export class UpdateSuperAdminDto extends PartialType(CreateSuperAdminDto) {}
