import 'reflect-metadata';
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';

import type WorkLog from '#/domain/entities/WorkLog.js';

import HttpStatusCode from '#/infrastructure/http/contstants/httpStatusCode.js';

import { app, filters, mockWorkLogRepository } from '../../../setup.js';

describe('API Integration: GET /work-logs (Get List)', () => {
  it('Happy Path: должен успешно вернуть список журналов через реальный контроллер и валидатор query', async () => {
    const mockEntity = mockDeep<WorkLog>();

    mockWorkLogRepository.getByDateRange.mockResolvedValue([mockEntity]);

    const response = await request(app).get('/work-logs').query(filters);

    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(mockWorkLogRepository.getByDateRange).toHaveBeenCalledTimes(1);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Sad Path: должен вернуть 400, если query параметры не прошли реальную валидацию', async () => {
    const response = await request(app).get('/work-logs').query({ sortByDate: 'not-asc-or-desc' });

    expect(response.status).toBe(HttpStatusCode.BadRequest);
    expect(mockWorkLogRepository.getByDateRange).not.toHaveBeenCalled();
  });

  it('Sad Path: должен вернуть 400, если query параметры не прошли реальную валидацию', async () => {
    const response = await request(app).get('/work-logs').query({ sortByDate: 'not-asc-or-desc' });

    expect(response.status).toBe(HttpStatusCode.BadRequest);
    expect(mockWorkLogRepository.getByDateRange).not.toHaveBeenCalled();
  });
});
