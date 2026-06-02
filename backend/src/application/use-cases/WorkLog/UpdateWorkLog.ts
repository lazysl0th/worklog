import { injectable, inject } from 'tsyringe';

import { updateWorkLogSchema } from '#/application/dtos/WorkLogDTO.js';
import type IWorkLogRepository from '#/application/interfaces/IWorkLogRepository.js';
import type IWorkTypeRepository from '#/application/interfaces/IWorkTypeRepository.js';
import WorkLog from '#/domain/entities/WorkLog.js';
import NotFoundError from '#/domain/errors/NotFoundError.js';
import ValidationError from '#/domain/errors/ValidationError.js';

@injectable()
export class UpdateWorkLogUseCase {
  constructor(
    @inject('IWorkLogRepository') private readonly workLogRepo: IWorkLogRepository,
    @inject('IWorkTypeRepository') private readonly workTypeRepo: IWorkTypeRepository,
  ) {}

  public async execute(input: unknown): Promise<WorkLog> {
    const parseResult = updateWorkLogSchema.safeParse(input);

    if (!parseResult.success) {
      throw new ValidationError(parseResult.error.issues);
    }

    const dto = parseResult.data;

    const existingWorkLog = await this.workLogRepo.findById(dto.id);
    if (!existingWorkLog) {
      throw new NotFoundError('WorkLog');
    }

    if (dto.workTypeId !== undefined && dto.workTypeId !== existingWorkLog.workTypeId) {
      const workTypeExists = await this.workTypeRepo.findById(dto.workTypeId);
      if (!workTypeExists) {
        throw new NotFoundError('WorkType');
      }
    }

    const updatedWorkLog = new WorkLog({
      id: existingWorkLog.id,
      date: dto.date !== undefined ? new Date(dto.date) : existingWorkLog.date,
      workTypeId: dto.workTypeId ?? existingWorkLog.workTypeId,
      volume: dto.volume ?? existingWorkLog.volume,
      unit: dto.unit ?? existingWorkLog.unit.value,
      contractorId: dto.contractorId ?? existingWorkLog.contractorId,
      createdAt: existingWorkLog.createdAt,
      updatedAt: new Date(),
    });

    await this.workLogRepo.save(updatedWorkLog);

    return updatedWorkLog;
  }
}
