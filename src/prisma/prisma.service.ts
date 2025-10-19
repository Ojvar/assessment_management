import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
<<<<<<< HEAD
import logger from '../utils/logger';
=======
import logger from 'src/utils/logger';
>>>>>>> 4924fe6 (add:logger)

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    logger.info('✅ Connected to database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    logger.info('❌ Disconnected from database');
  }
}
