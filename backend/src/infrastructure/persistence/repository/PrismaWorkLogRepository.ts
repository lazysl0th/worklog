import { inject, injectable } from 'tsyringe';

import type { TGetWorkLogsDto } from '#/application/dtos/WorkLogDTO.js';
import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';

import WorkLog from '#/domain/entities/WorkLog.js';

import type { BatchPayload } from '../prisma/generated/internal/prismaNamespace.js';
import type { WorkLogGetPayload } from '../prisma/generated/models.js';

import PrismaService from '../../services/PrismaService.js';

@injectable()
export class PrismaWorkLogRepository implements IWorkLogRepository {
  constructor(@inject(PrismaService) private readonly prisma: PrismaService) {}

  private createWorLog(workLog: WorkLogGetPayload<true>): WorkLog {
    return new WorkLog({
      ...workLog,
      volume: Number(workLog.volume.toFixed(2)),
      unit: workLog.unit,
    });
  }
  async getById(id: string): Promise<WorkLog | null> {
    const workLogData = await this.prisma.client.workLog.findUnique({ where: { id } });
    return workLogData ? this.createWorLog(workLogData) : null;
  }

  async getByDateRange({ startDate, endDate, sortByDate }: TGetWorkLogsDto): Promise<WorkLog[]> {
    const workLogDatas = await this.prisma.client.workLog.findMany({
      where: {
        date: {
          ...(startDate && { gte: startDate }),
          ...(endDate && { lte: endDate }),
        },
      },
      orderBy: { date: sortByDate ? 'asc' : 'desc' },
    });
    return workLogDatas.map((workLogData) => this.createWorLog(workLogData));
  }

  async save(workLog: WorkLog): Promise<WorkLog> {
    const workLogData = await this.prisma.client.workLog.upsert({
      where: { id: workLog.id },
      create: {
        ...workLog,
        unit: workLog.unit.value,
      },
      update: { ...workLog, unit: workLog.unit.value },
    });
    return this.createWorLog(workLogData);
  }

  async delete(ids: string[]): Promise<BatchPayload> {
    return await this.prisma.client.workLog.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
