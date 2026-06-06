import { injectable, inject } from 'tsyringe';

import type { TGetWorkLogsDto } from '#/application/dtos/WorkLogDTO.js';
import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';
import type WorkLog from '#/domain/entities/WorkLog.js';

@injectable()
export default class GetWorkLogs {
  constructor(
    @inject('IWorkLogRepository') private readonly workLogRepository: IWorkLogRepository,
  ) {}

  public async execute(filters: TGetWorkLogsDto): Promise<WorkLog[]> {
    return await this.workLogRepository.getAll(filters);
  }
}
