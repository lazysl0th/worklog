import type { TGetWorkLogsDto } from '../dtos/WorkLogDTO.js';

import type WorkLog from '#/domain/entities/WorkLog.js';

export default interface IWorkLogRepository {
  findById(id: string): Promise<WorkLog | null>;
  findByDateRange(filters: TGetWorkLogsDto): Promise<WorkLog[]>;
  save(workLog: WorkLog): Promise<WorkLog>;
  delete(id: string[]): Promise<void>;
}
