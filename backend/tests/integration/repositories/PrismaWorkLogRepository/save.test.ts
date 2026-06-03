import { describe, it, expect } from 'vitest';

import {
  prismaWorkLogRepository,
  createMockDbWorkLogRecord,
  createMockWorkLog,
  prismaMock,
  workLogId,
} from '../../../setup.js';

import WorkLog from '#/domain/entities/WorkLog.js';

describe('Integration: PrismaWorkLogRepository.save', () => {
  it('Happy Path: должен успешно выполнить upsert для сущности WorkLog и вернуть её инстанс', async () => {
    prismaMock.workLog.upsert.mockResolvedValue(createMockDbWorkLogRecord());

    const result = await prismaWorkLogRepository.save(createMockWorkLog());

    expect(result).toBeInstanceOf(WorkLog);
    expect(result.id).toBe(workLogId);
    expect(result.volume).toBe(15.0);
  });
});
