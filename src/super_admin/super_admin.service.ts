import { Injectable } from '@nestjs/common';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/utils/jwt_token/jwt_token.service';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CreateSuperAdminDto } from './dto/create-super_admin.dto';

@Injectable()
export class SuperAdminService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtTokenService,
    private bcryptService: BcryptService,
  ) {}

  async create(createSuperAdminDto: CreateSuperAdminDto) {
    console.log(
      `🚀 ~ file: super_admin.service.ts:17 ~ SuperAdminService ~ createSuperAdminDto:`,
      createSuperAdminDto,
    );
    const hashedPassword = await this.bcryptService.hashPassword(
      createSuperAdminDto.password,
    );

    await this.prismaService.user
      .create({
        data: {
          email: createSuperAdminDto.email,
          first_name: createSuperAdminDto.first_name,
          last_name: createSuperAdminDto.last_name,
          middle_name: createSuperAdminDto.middle_name,
          password: hashedPassword,
          role: 'SUPER_ADMIN',
        },
      })
      .catch((error) => {
        console.error('Error creating super admin:', error);
        throw new Error('Failed to create super admin');
      });
    return {
      message: 'Super admin created successfully',
    };
  }
}
