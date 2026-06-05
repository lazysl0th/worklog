import { inject, injectable } from 'tsyringe';

import type { TGetWorkLogsDto } from '#/application/dtos/WorkLogDTO.js';
import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';

import Contractor from '#/domain/entities/Contractors.js';
import WorkLog from '#/domain/entities/WorkLog.js';
import WorkType from '#/domain/entities/WorkType.js';

import type { BatchPayload } from '../prisma/generated/internal/prismaNamespace.js';
import type { WorkLogGetPayload } from '../prisma/generated/models.js';

import PrismaService from '../../services/PrismaService.js';

export type TWorkLogWithRelations = WorkLogGetPayload<{
  include: {
    workType: true;
    contractor: true;
  };
}>;

@injectable()
export class PrismaWorkLogRepository implements IWorkLogRepository {
  constructor(@inject(PrismaService) private readonly prisma: PrismaService) {}

  private createWorLog(workLog: TWorkLogWithRelations): WorkLog {
    return new WorkLog({
      ...workLog,
      workType: new WorkType(workLog.workType),
      contractor: new Contractor(workLog.contractor),
      volume: Number(workLog.volume.toFixed(2)),
      unit: workLog.unit,
    });
  }
  async getById(id: string): Promise<WorkLog | null> {
    const workLogData = await this.prisma.client.workLog.findUnique({
      where: { id },
      include: { workType: true, contractor: true },
    });
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
      include: { workType: true, contractor: true },
      orderBy: { date: sortByDate ? 'asc' : 'desc' },
    });
    return workLogDatas.map((workLogData) => this.createWorLog(workLogData));
  }

  async save(workLog: WorkLog): Promise<WorkLog> {
    const workLogData = await this.prisma.client.workLog.upsert({
      where: { id: workLog.id },
      create: {
        ...workLog,
        workType: { connect: { id: workLog.workType.id } },
        contractor: { connect: { id: workLog.contractor.id } },
        unit: workLog.unit.value,
      },
      update: {
        ...workLog,
        unit: workLog.unit.value,
        workType: { connect: { id: workLog.workType.id } },
        contractor: { connect: { id: workLog.contractor.id } },
      },
      include: { workType: true, contractor: true },
    });
    return this.createWorLog(workLogData);
  }

  async delete(ids: string[]): Promise<BatchPayload> {
    return await this.prisma.client.workLog.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
