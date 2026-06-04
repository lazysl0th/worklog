import 'reflect-metadata';
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';

import type WorkType from '#/domain/entities/WorkType.js';

import HttpStatusCode from '#/infrastructure/http/contstants/httpStatusCode.js';

import { app, mockWorkTypeRepository } from '../../../setup.js';

describe('API Integration: GET /work-types (Get List)', () => {
  it('Happy Path: должен успешно вернуть список типов работ через реальный контроллер', async () => {
    const mockWorkTypeEntity = mockDeep<WorkType>();
    mockWorkTypeRepository.getAll.mockResolvedValue([mockWorkTypeEntity]);
    const response = await request(app).get('/work-types');
    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(mockWorkTypeRepository.getAll).toHaveBeenCalledTimes(1);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
