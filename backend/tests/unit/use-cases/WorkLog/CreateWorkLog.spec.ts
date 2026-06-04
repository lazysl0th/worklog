import { randomUUID } from 'crypto';
import { describe, it, expect } from 'vitest';

import type { TCreateWorkLogDto } from '#/application/dtos/WorkLogDTO.js';

import CreateWorkLog from '#/application/use-cases/WorkLog/CreateWorkLog.js';
import WorkLog from '#/domain/entities/WorkLog.js';
import { EnumMeasurementValue } from '#/domain/value-objects/MeasurementUnit.js';

import { mockWorkLogRepository } from '../../../setup.js';

describe('Unit: CreateWorkLog Use Case', () => {
  it('Happy Path: должен успешно создать и сохранить запись журнала работ', async () => {
    const useCase = new CreateWorkLog(mockWorkLogRepository);

    const dto: TCreateWorkLogDto = {
      date: new Date('2026-06-03'),
      workTypeId: randomUUID(),
      volume: 145.678,
      unit: EnumMeasurementValue.M3,
      contractorId: randomUUID(),
    };

    mockWorkLogRepository.save.mockImplementation(async (workLog: WorkLog) => {
      return workLog;
    });

    const result = await useCase.execute(dto);

    expect(result).toBeInstanceOf(WorkLog);
    expect(result.id).toBeDefined();
    expect(typeof result.id).toBe('string');
    expect(result.date).toEqual(dto.date);
    expect(result.workTypeId).toBe(dto.workTypeId);
    expect(result.contractorId).toBe(dto.contractorId);
    expect(result.unit.value).toBe(dto.unit);

    expect(result.volume).toBe(145.68);

    expect(mockWorkLogRepository.save).toHaveBeenCalledTimes(1);
    expect(mockWorkLogRepository.save).toHaveBeenCalledWith(result);
  });
});
