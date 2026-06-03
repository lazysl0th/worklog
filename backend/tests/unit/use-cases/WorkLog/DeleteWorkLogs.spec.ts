import { randomUUID } from 'crypto';

import { describe, it, expect } from 'vitest';

import { mockWorkLogRepository } from '../../../setup.js';

import DeleteWorkLogs from '#/application/use-cases/WorkLog/DeleteWorkLogs.js';

describe('Unit: DeleteWorkLogs Use Case', () => {
  it('Happy Path: должен вызвать метод удаления в репозитории с массивом ID', async () => {
    const useCase = new DeleteWorkLogs(mockWorkLogRepository);
    const idsToDelete = [randomUUID(), randomUUID()];

    mockWorkLogRepository.delete.mockResolvedValue({ count: 1 });

    await useCase.execute(idsToDelete);

    expect(mockWorkLogRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockWorkLogRepository.delete).toHaveBeenCalledWith(idsToDelete);
  });
});
