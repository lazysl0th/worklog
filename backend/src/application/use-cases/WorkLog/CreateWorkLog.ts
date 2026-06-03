import { randomUUID } from 'crypto';

import { injectable, inject } from 'tsyringe';

import { type TCreateWorkLogDto } from '#/application/dtos/WorkLogDTO.js';
import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';
import WorkLog from '#/domain/entities/WorkLog.js';

@injectable()
export default class CreateWorkLog {
  constructor(
    @inject('IWorkLogRepository') private readonly workLogRepository: IWorkLogRepository,
  ) {}

  public async execute(workLogDto: TCreateWorkLogDto): Promise<WorkLog> {
    const workLog = new WorkLog({
      id: randomUUID(),
      date: workLogDto.date,
      workTypeId: workLogDto.workTypeId,
      volume: workLogDto.volume,
      unit: workLogDto.unit,
      contractorId: workLogDto.contractorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.workLogRepository.save(workLog);
  }
}
