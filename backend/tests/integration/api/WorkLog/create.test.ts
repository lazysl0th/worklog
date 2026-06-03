import 'reflect-metadata';
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';

import { app, contractorId, mockWorkLogRepository, workTypeId } from '../../../setup.js';

import WorkLog from '#/domain/entities/WorkLog.js';
import HttpStatusCode from '#/infrastructure/http/contstants/httpStatusCode.js';

describe('API Integration: POST /work-logs (Create)', () => {
  it('Happy Path: должен вернуть 201 Created через реальный контроллер', async () => {
    const expectedEntity = mockDeep<WorkLog>();
    mockWorkLogRepository.save.mockResolvedValue(expectedEntity);

    const inputDto = {
      date: '2026-06-05',
      workTypeId: workTypeId,
      volume: 12.5,
      unit: 'M3',
      contractorId: contractorId,
    };

    const response = await request(app).post('/work-logs').send(inputDto);

    expect(response.status).toBe(HttpStatusCode.Created);
    expect(mockWorkLogRepository.save).toHaveBeenCalledTimes(1);

    expect(mockWorkLogRepository.save).lastCalledWith(expect.any(WorkLog));

    const savedWorkLog = mockWorkLogRepository.save.mock.lastCall?.[0];

    expect(savedWorkLog).toBeDefined();

    if (savedWorkLog) {
      expect(savedWorkLog.volume).toBe(12.5);
    }
  });
});
