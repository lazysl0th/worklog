import { injectable, inject } from 'tsyringe';

import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';

@injectable()
export default class DeleteWorkLogs {
  constructor(
    @inject('IWorkLogRepository') private readonly workLogRepository: IWorkLogRepository,
  ) {}

  public async execute(id: string[]): Promise<void> {
    await this.workLogRepository.delete(id);
  }
}
