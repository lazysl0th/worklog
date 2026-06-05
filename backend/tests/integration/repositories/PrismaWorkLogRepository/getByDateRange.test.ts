import { describe, it, expect } from 'vitest';

import WorkLog from '#/domain/entities/WorkLog.js';

import {
  createMockDbWorkLogRecord,
  filters,
  prismaMock,
  prismaWorkLogRepository,
} from '../../../setup.js';

describe('Integration: PrismaWorkLogRepository.getByDateRange', () => {
  it('Happy Path: должен построить корректный запрос фильтрации и вернуть массив WorkLog', async () => {
    const dbRecords = [createMockDbWorkLogRecord()];

    prismaMock.workLog.findMany.mockResolvedValue(dbRecords);

    const result = await prismaWorkLogRepository.getByDateRange(filters);

    expect(result).toHaveLength(1);
    expect(result.every((workLog) => workLog instanceof WorkLog)).toBe(true);
    expect(prismaMock.workLog.findMany).toHaveBeenCalledWith({
      where: {
        date: {
          gte: filters.startDate,
          lte: filters.endDate,
        },
      },
      orderBy: { date: 'asc' },
      include: { workType: true, contractor: true },
    });
  });
  describe('Integration: PrismaWorkLogRepository.getByDateRange', () => {
    it('Edge Case: должен работать без фильтров и с дефолтной сортировкой (desc)', async () => {
      prismaMock.workLog.findMany.mockResolvedValue([]);

      await prismaWorkLogRepository.getByDateRange({});

      expect(prismaMock.workLog.findMany).toHaveBeenCalledWith({
        where: { date: {} },
        orderBy: { date: 'desc' },
        include: { workType: true, contractor: true },
      });
    });

    it('Edge Case: должен работать только с startDate', async () => {
      prismaMock.workLog.findMany.mockResolvedValue([]);

      await prismaWorkLogRepository.getByDateRange({ startDate: filters.startDate });

      expect(prismaMock.workLog.findMany).toHaveBeenCalledWith({
        where: { date: { gte: filters.startDate } },
        orderBy: { date: 'desc' },
        include: { workType: true, contractor: true },
      });
    });

    it('Edge Case: должен работать только с endDate', async () => {
      prismaMock.workLog.findMany.mockResolvedValue([]);

      await prismaWorkLogRepository.getByDateRange({ endDate: filters.endDate });

      expect(prismaMock.workLog.findMany).toHaveBeenCalledWith({
        where: { date: { lte: filters.endDate } },
        orderBy: { date: 'desc' },
        include: { workType: true, contractor: true },
      });
    });
  });
});
