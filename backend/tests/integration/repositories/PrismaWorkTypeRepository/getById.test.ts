import { describe, it, expect } from 'vitest';

import {
  createDbMockWorkTypeRecord,
  prismaMock,
  workTypeId,
  createMockWorkType,
  prismaWorkTypeRepository,
} from '../../../setup.js';

import WorkType from '#/domain/entities/WorkType.js';

describe('Integration: PrismaWorkTypeRepository.findById', () => {
  it('Happy Path: должен вернуть инстанс WorkType, если запись найдена', async () => {
    prismaMock.workType.findUnique.mockResolvedValue(createDbMockWorkTypeRecord());

    const result = await prismaWorkTypeRepository.getById(workTypeId);

    expect(result).toBeInstanceOf(WorkType);
    expect(result?.id).toBe(createMockWorkType().id);
    expect(result?.name).toBe(createMockWorkType().name);
  });

  it('Edge Case: должен вернуть null, если запись не найдена', async () => {
    prismaMock.workType.findUnique.mockResolvedValue(null);

    const result = await prismaWorkTypeRepository.getById(createMockWorkType().id);

    expect(result).toBeNull();
  });
});
