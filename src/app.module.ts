import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { SecurityModule } from './security/security.module';
import { SuperAdminModule } from './super_admin/super_admin.module';
import { BcryptModule } from './utils/bcrypt/bcrypt.module';
import { EmailModule } from './utils/email/email.module';
import { Fast2SmsModule } from './utils/fast_2_sms/fast_2_sms.module';
import { JwtTokenModule } from './utils/jwt_token/jwt_token.module';
import { PrismaModule } from './utils/prisma/prisma.module';
import { CheckpointModule } from './checkpoint/checkpoint.module';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    Fast2SmsModule,
    JwtTokenModule,
    EventModule,
    AdminModule,
    SuperAdminModule,
    BcryptModule,
    AuthModule,
    SecurityModule,
    CheckpointModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
