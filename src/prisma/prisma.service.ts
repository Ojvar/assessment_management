// prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    let connected = false;
    let retries = 10;

    while (!connected && retries > 0) {
      try {
        await this.$connect();
        connected = true;
      } catch (e) {
        retries--;
        console.warn(
          `⚠️  Prisma failed to connect. Retry ${10 - retries}/10...`,
        );
        await new Promise((r) => setTimeout(r, 3000)); // 3 ثانیه صبر کن
      }
    }

    if (!connected) {
      throw new Error(
        '❌ Could not connect to database after multiple attempts.',
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
