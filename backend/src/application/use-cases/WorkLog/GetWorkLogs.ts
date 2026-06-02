import { injectable, inject } from 'tsyringe';

import { getWorkLogsFilterSchema } from '#/application/dtos/WorkLogDTO.js';
import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';
import type WorkLog from '#/domain/entities/WorkLog.js';
import ValidationException from '#/domain/errors/ValidationError.js';

@injectable()
export class GetWorkLogsListUseCase {
  constructor(@inject('IWorkLogRepository') private readonly workLogRepo: IWorkLogRepository) {}

  public async execute(input: unknown): Promise<WorkLog[]> {
    const parseResult = getWorkLogsFilterSchema.safeParse(input);

    if (!parseResult.success) {
      throw new ValidationException(parseResult.error.issues);
    }

    const filters = parseResult.data;

    if (filters.contractorId !== undefined) {
      return this.workLogRepo.findByContractorId(filters.contractorId);
    }

    if (filters.startDate !== undefined && filters.endDate !== undefined) {
      return this.workLogRepo.findByDateRange(
        new Date(filters.startDate),
        new Date(filters.endDate),
      );
    }

    return [];
  }
}
