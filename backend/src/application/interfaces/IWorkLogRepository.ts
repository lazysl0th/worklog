import type WorkLog from '#/domain/entities/WorkLog.js';

export interface IWorkLogRepository {
  findById(id: string): Promise<WorkLog | null>;
  findByDateRange(startDate: Date, endDate: Date): Promise<WorkLog[]>;
  findByContractorId(contractorId: string): Promise<WorkLog[]>;
  save(workLog: WorkLog): Promise<void>;
  delete(id: string): Promise<void>;
}
