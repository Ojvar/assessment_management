import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import Logger from '../utils/logger';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    Logger.info('✅ Connected to database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    Logger.info('❌ Disconnected from database');
  }
}
