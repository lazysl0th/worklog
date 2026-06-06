import { inject, injectable } from 'tsyringe';

import type { TGetWorkLogsDto } from '#/application/dtos/WorkLogDTO.js';
import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';

import Contractor from '#/domain/entities/Contractors.js';
import WorkLog from '#/domain/entities/WorkLog.js';
import WorkType from '#/domain/entities/WorkType.js';

import type { BatchPayload } from '../prisma/generated/internal/prismaNamespace.js';
import type { WorkLogGetPayload, WorkLogWhereInput } from '../prisma/generated/models.js';

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
      description: workLog.description ?? '',
    });
  }
  async getById(id: string): Promise<WorkLog | null> {
    const workLogData = await this.prisma.client.workLog.findUnique({
      where: { id },
      include: { workType: true, contractor: true },
    });
    return workLogData ? this.createWorLog(workLogData) : null;
  }

  async getAll({ startDate, endDate, sortBy, sortDesc }: TGetWorkLogsDto): Promise<WorkLog[]> {
    const where: WorkLogWhereInput = {};

    if (startDate || endDate) {
      where.date = {
        ...(startDate && { gte: new Date(startDate) }),
        ...(endDate && { lte: new Date(endDate) }),
      };
    }

    const orderBy = {
      ...(sortBy && { [sortBy]: sortDesc ? 'desc' : 'asc' }),
    };

    const workLogDatas = await this.prisma.client.workLog.findMany({
      where,
      orderBy,
      include: { workType: true, contractor: true },
    });
    return workLogDatas.map((workLogData) => this.createWorLog(workLogData));
  }

  async save(workLog: WorkLog): Promise<WorkLog> {
    const workLogData = await this.prisma.client.workLog.upsert({
      where: { id: workLog.id },
      create: {
        ...workLog,
        workType: { connect: { id: workLog.workType.id } },
        contractor: {
          connectOrCreate: {
            where: { fullName: workLog.contractor.fullName },
            create: { fullName: workLog.contractor.fullName },
          },
        },
        unit: workLog.unit.value,
      },
      update: {
        ...workLog,
        unit: workLog.unit.value,
        workType: { connect: { id: workLog.workType.id } },
        contractor: {
          connectOrCreate: {
            where: { fullName: workLog.contractor.fullName },
            create: { fullName: workLog.contractor.fullName },
          },
        },
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
