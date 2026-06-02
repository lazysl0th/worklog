import { inject, injectable } from 'tsyringe';

import PrismaService from '../../services/PrismaService.js';
import type { WorkLogGetPayload } from '../prisma/generated/models.js';

import type { TGetWorkLogsDto } from '#/application/dtos/WorkLogDTO.js';
import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';
import WorkLog from '#/domain/entities/WorkLog.js';

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
  async findById(id: string): Promise<WorkLog | null> {
    const workLogData = await this.prisma.client.workLog.findUnique({ where: { id } });
    return workLogData ? this.createWorLog(workLogData) : null;
  }

  async findByDateRange({ startDate, endDate, sortByDate }: TGetWorkLogsDto): Promise<WorkLog[]> {
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

  async findByContractorId(contractorId: string): Promise<WorkLog[]> {
    const models = await this.prisma.client.workLog.findMany({
      where: { contractorId },
    });
    return models.map((model) => this.createWorLog(model));
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

  async delete(id: string[]): Promise<void> {
    await this.prisma.client.workLog.deleteMany({
      where: { id: { in: id } },
    });
  }
}
