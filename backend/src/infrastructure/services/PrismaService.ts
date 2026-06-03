import { PrismaPg } from '@prisma/adapter-pg';
import { inject, injectable, singleton } from 'tsyringe';

import { PrismaClient } from '../persistence/prisma/generated/client.js';

import { CONFIG_TOKEN, type TPrismaConfig } from '#/application/interfaces/IConfig.js';

@injectable()
@singleton()
export default class PrismaService {
  public readonly client: PrismaClient;

  constructor(@inject(CONFIG_TOKEN) private config: TPrismaConfig) {
    const adapter = new PrismaPg({
      connectionString: this.config.DATABASE_URL,
    });

    this.client = new PrismaClient({ adapter });
  }

  async connect(): Promise<void> {
    await this.client.$connect();
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
