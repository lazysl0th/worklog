import { inject, injectable } from 'tsyringe';

import type { BatchPayload } from '../prisma/generated/internal/prismaNamespace.js';

import type IWorkTypeRepository from '#/application/interfaces/IWorkTypeRepository.js';
import WorkType from '#/domain/entities/WorkType.js';
import PrismaService from '#/infrastructure/services/PrismaService.js';

@injectable()
export class PrismaWorkTypeRepository implements IWorkTypeRepository {
  constructor(@inject(PrismaService) private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<WorkType | null> {
    const workTypeData = await this.prisma.client.workType.findUnique({ where: { id } });
    return workTypeData ? new WorkType(workTypeData) : null;
  }

  async getAll(): Promise<WorkType[]> {
    const workTypesData = await this.prisma.client.workType.findMany();
    return workTypesData.map((workTypeData) => new WorkType(workTypeData));
  }

  async save(workType: WorkType): Promise<WorkType> {
    const workTypeData = await this.prisma.client.workType.upsert({
      where: { id: workType.id, name: workType.name },
      update: { name: workType.name },
      create: { id: workType.id, name: workType.name },
    });
    return new WorkType(workTypeData);
  }

  async delete(id: string[]): Promise<BatchPayload> {
    return await this.prisma.client.workType.deleteMany({
      where: { id: { in: id } },
    });
  }
}
