import { randomUUID } from 'crypto';
import { describe, it, expect } from 'vitest';

import { prismaMock, prismaWorkTypeRepository } from '../../../setup.js';

describe('Integration: PrismaWorkTypeRepository.delete', () => {
  it('Happy Path: должен передать массив ID в Prisma и вернуть BatchPayload с количеством удаленных записей', async () => {
    const idsToDelete = [randomUUID(), randomUUID(), randomUUID()];
    const expectedPayload = { count: 3 };

    prismaMock.workType.deleteMany.mockResolvedValue(expectedPayload);

    const result = await prismaWorkTypeRepository.delete(idsToDelete);

    expect(result).toHaveProperty('count');
    expect(result.count).toBe(3);

    expect(prismaMock.workType.deleteMany).toHaveBeenCalledWith({
      where: {
        id: {
          in: idsToDelete,
        },
      },
    });
  });
});
