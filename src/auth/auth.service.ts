import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BcryptService } from 'src/utils/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/utils/jwt_token/jwt_token.service';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly bcryptService: BcryptService,
  ) {}

  async login(email: string, password: string) {
    console.log(
      `🚀 ~ file: auth.service.ts:15 ~ AuthService ~ password:`,
      password,
    );
    console.log(`🚀 ~ file: auth.service.ts:15 ~ AuthService ~ email:`, email);
    const user = await this.prismaService.user.findUnique({ where: { email } });
    console.log(`🚀 ~ file: auth.service.ts:21 ~ AuthService ~ user:`, user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.bcryptService.comparePassword(
      password,
      user.password,
    );
    console.log(
      `🚀 ~ file: auth.service.ts:30 ~ AuthService ~ isPasswordValid:`,
      isPasswordValid,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;
    const token = await this.jwtTokenService.generateToken(result);
    return { ...result, token };
  }

  async signup(createAuthDto: CreateAuthDto) {
    const { first_name, last_name, middle_name, email, password } =
      createAuthDto;

    // Hash password
    const hashedPassword = await this.bcryptService.hashPassword(password);

    // Create user
    const user = await this.prismaService.user.create({
      data: {
        first_name,
        last_name,
        middle_name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
    });

    const { password: _, ...result } = user;
    const token = await this.jwtTokenService.generateToken(result);
    return { ...result, token };
  }
}
