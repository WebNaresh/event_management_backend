import { Module } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

@Module({
  controllers: [SecurityController],
  providers: [SecurityService, PrismaService],
})
export class SecurityModule {}
