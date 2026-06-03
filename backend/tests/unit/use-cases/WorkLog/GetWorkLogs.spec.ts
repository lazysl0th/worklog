import { describe, it, expect } from 'vitest';

import { createMockWorkLog, filters, mockWorkLogRepository } from '../../../setup.js';

import GetWorkLogs from '#/application/use-cases/WorkLog/GetWorkLogs.js';
import WorkLog from '#/domain/entities/WorkLog.js';

describe('Unit: GetWorkLogs Use Case', () => {
  it('Happy Path: должен запросить логи из репозитория с переданными фильтрами', async () => {
    const useCase = new GetWorkLogs(mockWorkLogRepository);

    const mockLogs = [createMockWorkLog()];

    mockWorkLogRepository.getByDateRange.mockResolvedValue(mockLogs);

    const result = await useCase.execute(filters);

    expect(result.every((workLog) => workLog instanceof WorkLog)).toBe(true);
    expect(mockWorkLogRepository.getByDateRange).toHaveBeenCalledTimes(1);
    expect(mockWorkLogRepository.getByDateRange).toHaveBeenCalledWith(filters);
  });
});
