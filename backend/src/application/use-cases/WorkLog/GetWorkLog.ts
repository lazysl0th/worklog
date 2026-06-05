import { injectable, inject } from 'tsyringe';

import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';
import type WorkLog from '#/domain/entities/WorkLog.js';

import NotFoundError from '#/domain/errors/NotFoundError.js';

@injectable()
export default class GetWorkLog {
  constructor(
    @inject('IWorkLogRepository') private readonly workLogRepository: IWorkLogRepository,
  ) {}

  public async execute(id: string): Promise<WorkLog> {
    const result = await this.workLogRepository.getById(id);
    if (!result) {
      throw new NotFoundError('WorkLog');
    }
    return result;
  }
}
