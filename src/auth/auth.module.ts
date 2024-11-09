import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/utils/bcrypt/bcrypt.module';
import { JwtTokenModule } from 'src/utils/jwt_token/jwt_token.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtTokenModule, BcryptModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
