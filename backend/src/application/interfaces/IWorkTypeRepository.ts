import type WorkType from '#/domain/entities/WorkType.js';

export default interface IWorkTypeRepository {
  getById(id: string): Promise<WorkType | null>;
  getAll(): Promise<WorkType[]>;
  save(workType: WorkType): Promise<void>;
  delete(id: string[]): Promise<void>;
}
