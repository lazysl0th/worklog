import { inject, injectable } from 'tsyringe';

import type IWorkTypeRepository from '#/application/interfaces/IWorkTypeRepository.js';
import WorkType from '#/domain/entities/WorkType.js';
import PrismaService from '#/infrastructure/services/PrismaService.js';

@injectable()
export class PrismaWorkTypeRepository implements IWorkTypeRepository {
  constructor(@inject(PrismaService) private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<WorkType | null> {
    const model = await this.prisma.client.workType.findUnique({ where: { id } });
    return model ? new WorkType(model) : null;
  }

  async getAll(): Promise<WorkType[]> {
    const models = await this.prisma.client.workType.findMany();
    return models.map((model) => new WorkType(model));
  }

  async save(workType: WorkType): Promise<void> {
    await this.prisma.client.workType.upsert({
      where: { id: workType.id, name: workType.name },
      update: { name: workType.name },
      create: { id: workType.id, name: workType.name },
    });
  }

  async delete(id: string[]): Promise<void> {
    await this.prisma.client.workType.deleteMany({
      where: { id: { in: id } },
    });
  }
}
