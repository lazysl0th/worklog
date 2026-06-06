import { describe, it, expect } from 'vitest';

import type { TUpdateWorkLogDto } from '#/application/dtos/WorkLogDTO.js';

import UpdateWorkLog from '#/application/use-cases/WorkLog/UpdateWorkLog.js';
import NotFoundError from '#/domain/errors/NotFoundError.js';

import { createMockWorkLog, mockWorkLogRepository, workLogId } from '../../../setup.js';

describe('Unit: UpdateWorkLog Use Case', () => {
  const dto: TUpdateWorkLogDto = {
    id: workLogId,
    date: createMockWorkLog().date,
  };

  it('Happy Path: должен успешно обновить только переданные поля, сохраняя остальные', async () => {
    const useCase = new UpdateWorkLog(mockWorkLogRepository);

    mockWorkLogRepository.getById.mockResolvedValue(createMockWorkLog());
    mockWorkLogRepository.save.mockImplementation(async (workLog) => workLog);

    const result = await useCase.execute(dto);

    expect(result.date).toEqual(createMockWorkLog().date);
    expect(result.workType.id).toBe(createMockWorkLog().workType.id);
    expect(result.contractor.fullName).toBe(createMockWorkLog().contractor.fullName);
    expect(result.unit.value).toBe(createMockWorkLog().unit.value);

    expect(mockWorkLogRepository.save).toHaveBeenCalledWith(result);
  });

  it('Edge Case: должен выбросить NotFoundError, если лог с таким id отсутствует', async () => {
    const useCase = new UpdateWorkLog(mockWorkLogRepository);

    mockWorkLogRepository.getById.mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrow(NotFoundError);
    await expect(useCase.execute(dto)).rejects.toThrow('WorkLog was not found.');

    try {
      await useCase.execute(dto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        expect(error.code).toBe('WORKLOG_NOT_FOUND');
      }
    }

    expect(mockWorkLogRepository.save).not.toHaveBeenCalled();
  });
});
