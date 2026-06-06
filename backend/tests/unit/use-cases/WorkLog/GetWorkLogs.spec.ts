import { describe, it, expect } from 'vitest';

import GetWorkLogs from '#/application/use-cases/WorkLog/GetWorkLogs.js';
import WorkLog from '#/domain/entities/WorkLog.js';

import { createMockWorkLog, filters, mockWorkLogRepository } from '../../../setup.js';

describe('Unit: GetWorkLogs Use Case', () => {
  it('Happy Path: должен запросить логи из репозитория с переданными фильтрами', async () => {
    const useCase = new GetWorkLogs(mockWorkLogRepository);

    const mockLogs = [createMockWorkLog()];

    mockWorkLogRepository.getAll.mockResolvedValue(mockLogs);

    const result = await useCase.execute(filters);

    expect(result.every((workLog) => workLog instanceof WorkLog)).toBe(true);
    expect(mockWorkLogRepository.getAll).toHaveBeenCalledTimes(1);
    expect(mockWorkLogRepository.getAll).toHaveBeenCalledWith(filters);
  });
});
