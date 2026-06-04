import type WorkLog from '#/domain/entities/WorkLog.js';

import type { TGetWorkLogsDto } from '../dtos/WorkLogDTO.js';
import type { DeleteResult } from './IWorkTypeRepository.js';

export default interface IWorkLogRepository {
  getById(id: string): Promise<WorkLog | null>;
  getByDateRange(filters: TGetWorkLogsDto): Promise<WorkLog[]>;
  save(workLog: WorkLog): Promise<WorkLog>;
  delete(ids: string[]): Promise<DeleteResult>;
}
