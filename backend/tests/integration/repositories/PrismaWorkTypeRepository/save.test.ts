import { describe, it, expect } from 'vitest';

import WorkType from '#/domain/entities/WorkType.js';

import {
  createMockWorkType,
  prismaMock,
  createDbMockWorkTypeRecord,
  prismaWorkTypeRepository,
} from '../../../setup.js';

describe('Integration: PrismaWorkTypeRepository.save', () => {
  it('Happy Path: должен успешно выполнить upsert для сущности WorkType и вернуть её инстанс', async () => {
    prismaMock.workType.upsert.mockResolvedValue(createDbMockWorkTypeRecord());

    const result = await prismaWorkTypeRepository.save(createMockWorkType());

    expect(result).toBeInstanceOf(WorkType);
    expect(result.id).toBe(createMockWorkType().id);
    expect(result.name).toBe(createMockWorkType().name);
    expect(prismaMock.workType.upsert).toHaveBeenCalledTimes(1);
  });
});
