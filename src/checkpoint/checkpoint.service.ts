import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Injectable()
export class CheckpointService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(checkpoint_id: string) {
    const checkpoint = await this.prisma.checkPoints.findUnique({
      where: {
        id: checkpoint_id,
      },
    });
    if (!checkpoint) {
      return new NotFoundException('Checkpoint not found');
    }
    return {
      checkpoint,
      message: 'Checkpoint found',
    };
  }

  async addUserToCheckpoint(checkpoint_id: string, user_id: string) {
    const checkpoint = await this.prisma.checkPoints.findUnique({
      where: {
        id: checkpoint_id,
      },
    });
    console.log(
      `🚀 ~ file: checkpoint.service.ts:28 ~ CheckpointService ~ checkpoint:`,
      checkpoint,
    );
    if (!checkpoint) {
      return new NotFoundException('Checkpoint not found');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });
    console.log(
      `🚀 ~ file: checkpoint.service.ts:38 ~ CheckpointService ~ user:`,
      user,
    );
    if (!user) {
      return new NotFoundException('User not found');
    }

    await this.prisma.checkPointsOnUser.create({
      data: {
        user: {
          connect: {
            id: user_id,
          },
        },
        checkPoints: {
          connect: {
            id: checkpoint_id,
          },
        },
      },
    });
    return {
      message: 'User added to checkpoint',
    };
  }
}
