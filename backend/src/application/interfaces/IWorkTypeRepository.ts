import type WorkType from '#/domain/entities/WorkType.js';

export interface DeleteResult {
  count: number;
}

export default interface IWorkTypeRepository {
  getById(id: string): Promise<WorkType | null>;
  getAll(): Promise<WorkType[]>;
  save(workType: WorkType): Promise<WorkType>;
  delete(ids: string[]): Promise<DeleteResult>;
}
