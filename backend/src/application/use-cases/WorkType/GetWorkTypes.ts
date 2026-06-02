import { injectable, inject } from 'tsyringe';

import type IWorkTypeRepository from '#/application/interfaces/IWorkTypeRepository.js';
import type WorkType from '#/domain/entities/WorkType.js';
@injectable()
export default class GetWorkTypes {
  constructor(
    @inject('IWorkTypeRepository') private readonly workTypeRepository: IWorkTypeRepository,
  ) {}

  public async execute(): Promise<WorkType[]> {
    return this.workTypeRepository.getAll();
  }
}
