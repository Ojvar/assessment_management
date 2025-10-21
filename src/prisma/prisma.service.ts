import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    logger.info('✅ Connected to database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    logger.info('❌ Disconnected from database');
  }
}
