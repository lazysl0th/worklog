import type WorkType from '#/domain/entities/WorkType.js';

export default interface IWorkTypeRepository {
  findById(id: string): Promise<WorkType | null>;
  findByName(name: string): Promise<WorkType | null>;
  getAll(): Promise<WorkType[]>;
  save(workType: WorkType): Promise<void>;
  delete(id: string): Promise<void>;
}
