import { injectable, inject } from 'tsyringe';

import type IWorkTypeRepository from '#/application/interfaces/IWorkTypeRepository.js';
import type WorkType from '#/domain/entities/WorkType.js';
@injectable()
export class GetWorkTypesUseCase {
  constructor(@inject('IWorkTypeRepository') private readonly workTypeRepo: IWorkTypeRepository) {}

  public async execute(): Promise<WorkType[]> {
    return this.workTypeRepo.findAll();
  }
}
