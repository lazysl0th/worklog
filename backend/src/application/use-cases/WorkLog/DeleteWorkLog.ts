import { injectable, inject } from 'tsyringe';

import { deleteWorkLogSchema } from '#/application/dtos/WorkLogDTO.js';
import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';
import NotFoundError from '#/domain/errors/NotFoundError.js';
import ValidationException from '#/domain/errors/ValidationError.js';

@injectable()
export class DeleteWorkLogUseCase {
  constructor(@inject('IWorkLogRepository') private readonly workLogRepo: IWorkLogRepository) {}

  public async execute(input: unknown): Promise<void> {
    const parseResult = deleteWorkLogSchema.safeParse(input);

    if (!parseResult.success) {
      throw new ValidationException(parseResult.error.issues);
    }

    const { id } = parseResult.data;

    const existingWorkLog = await this.workLogRepo.findById(id);
    if (!existingWorkLog) {
      throw new NotFoundError('WorkLog');
    }

    await this.workLogRepo.delete(id);
  }
}
