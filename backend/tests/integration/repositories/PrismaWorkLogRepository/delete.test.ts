import { randomUUID } from 'crypto';
import { describe, it, expect } from 'vitest';

import { prismaMock, prismaWorkLogRepository } from '../../../setup.js';

describe('Integration: PrismaWorkLogRepository.delete', () => {
  it('Happy Path: должен вызвать deleteMany с оператором IN для переданного массива ID', async () => {
    const idsToDelete = [randomUUID(), randomUUID()];

    prismaMock.workLog.deleteMany.mockResolvedValue({ count: idsToDelete.length });

    await prismaWorkLogRepository.delete(idsToDelete);

    expect(prismaMock.workLog.deleteMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.workLog.deleteMany).toHaveBeenCalledWith({
      where: {
        id: { in: idsToDelete },
      },
    });
  });
});
