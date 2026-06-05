import { describe, it, expect } from 'vitest';

import WorkLog from '#/domain/entities/WorkLog.js';

import {
  workLogId,
  prismaMock,
  createMockDbWorkLogRecord,
  prismaWorkLogRepository,
} from '../../../setup.js';

describe('Integration: PrismaWorkLogRepository.findById', () => {
  it('Happy Path: должен вернуть инстанс WorkLog, если запись найдена в БД', async () => {
    prismaMock.workLog.findUnique.mockResolvedValue(createMockDbWorkLogRecord());

    const result = await prismaWorkLogRepository.getById(createMockDbWorkLogRecord().id);

    expect(result).toBeInstanceOf(WorkLog);
    expect(prismaMock.workLog.findUnique).toHaveBeenCalledWith({
      where: { id: createMockDbWorkLogRecord().id },
      include: { workType: true, contractor: true },
    });
  });

  it('Edge Case: должен вернуть null, если записи с таким id нет в БД', async () => {
    prismaMock.workLog.findUnique.mockResolvedValue(null);

    const result = await prismaWorkLogRepository.getById(workLogId);

    expect(result).toBeNull();
  });
});
