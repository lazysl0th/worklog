import { injectable, inject } from 'tsyringe';

import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';
import type { DeleteResult } from '#/application/interfaces/IWorkTypeRepository.js';

@injectable()
export default class DeleteWorkLogs {
  constructor(
    @inject('IWorkLogRepository') private readonly workLogRepository: IWorkLogRepository,
  ) {}

  public async execute(ids: string[]): Promise<DeleteResult> {
    return await this.workLogRepository.delete(ids);
  }
}
