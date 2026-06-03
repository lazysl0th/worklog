import { describe, it, expect } from 'vitest';

import {
  createDbMockWorkTypeRecord,
  prismaMock,
  prismaWorkTypeRepository,
} from '../../../setup.js';

import WorkType from '#/domain/entities/WorkType.js';

describe('Integration: PrismaWorkTypeRepository.findAll', () => {
  it('Happy Path: должен вернуть массив всех типов работ, где каждый элемент является инстансом WorkType', async () => {
    const dbRecords = [createDbMockWorkTypeRecord(), createDbMockWorkTypeRecord()];

    prismaMock.workType.findMany.mockResolvedValue(dbRecords);

    const result = await prismaWorkTypeRepository.getAll();

    expect(result).toHaveLength(2);

    expect(result.every((workType) => workType instanceof WorkType)).toBe(true);

    expect(prismaMock.workType.findMany).toHaveBeenCalledTimes(1);
  });
});
