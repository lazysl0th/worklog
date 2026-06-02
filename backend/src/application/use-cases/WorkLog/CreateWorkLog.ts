import { randomUUID } from 'crypto';

import { injectable, inject } from 'tsyringe';

import { createWorkLogSchema } from '#/application/dtos/WorkLogDTO.js';
import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';
import type IWorkTypeRepository from '#/application/interfaces/IWorkTypeRepository.js';
import WorkLog from '#/domain/entities/WorkLog.js';
import NotFoundError from '#/domain/errors/NotFoundError.js';
import ValidationError from '#/domain/errors/ValidationError.js';

@injectable()
export class CreateWorkLogUseCase {
  constructor(
    @inject('IWorkLogRepository') private readonly workLogRepo: IWorkLogRepository,
    @inject('IWorkTypeRepository') private readonly workTypeRepo: IWorkTypeRepository,
  ) {}

  public async execute(input: unknown): Promise<WorkLog> {
    const parseResult = createWorkLogSchema.safeParse(input);

    if (!parseResult.success) {
      throw new ValidationError(parseResult.error.issues);
    }

    const dto = parseResult.data;

    const workTypeExists = await this.workTypeRepo.findById(dto.workTypeId);
    if (!workTypeExists) {
      throw new NotFoundError('WorkType');
    }

    const now = new Date();
    const workLog = new WorkLog({
      id: randomUUID(),
      date: new Date(dto.date),
      workTypeId: dto.workTypeId,
      volume: dto.volume,
      unit: dto.unit,
      contractorId: dto.contractorId,
      createdAt: now,
      updatedAt: now,
    });

    await this.workLogRepo.save(workLog);

    return workLog;
  }
}
