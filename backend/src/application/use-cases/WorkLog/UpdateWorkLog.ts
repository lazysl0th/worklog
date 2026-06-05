import { injectable, inject } from 'tsyringe';

import type { TUpdateWorkLogDto } from '#/application/dtos/WorkLogDTO.js';
import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';

import WorkLog from '#/domain/entities/WorkLog.js';
import NotFoundError from '#/domain/errors/NotFoundError.js';

@injectable()
export default class UpdateWorkLog {
  constructor(
    @inject('IWorkLogRepository') private readonly workLogRepository: IWorkLogRepository,
  ) {}

  public async execute(workLogDto: TUpdateWorkLogDto): Promise<WorkLog> {
    const workLog = await this.workLogRepository.getById(workLogDto.id);
    if (!workLog) throw new NotFoundError('WorkLog');

    const updatedWorkLog = new WorkLog({
      id: workLog.id,
      date: workLogDto.date !== undefined ? workLogDto.date : workLog.date,
      workType: { id: workLogDto.workTypeId ?? workLog.workType.id },
      volume: workLogDto.volume ?? workLog.volume,
      unit: workLogDto.unit ?? workLog.unit.value,
      contractor: { id: workLogDto.contractorId ?? workLog.contractor.id },
      createdAt: workLog.createdAt,
      updatedAt: new Date(),
    });

    return this.workLogRepository.save(updatedWorkLog);
  }
}
