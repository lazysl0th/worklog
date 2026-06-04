import 'reflect-metadata';
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';

import type WorkLog from '#/domain/entities/WorkLog.js';

import NotFoundError from '#/domain/errors/NotFoundError.js';
import HttpStatusCode from '#/infrastructure/http/contstants/httpStatusCode.js';

import { mockWorkLogRepository, app, createMockWorkLog, workLogId } from '../../../setup.js';

describe('API Integration: PATCH /work-logs/:id (Update)', () => {
  it('Happy Path: должен успешно обновить журнал через реальный контроллер и валидатор', async () => {
    const existingWorkLog = createMockWorkLog();

    mockWorkLogRepository.getById.mockResolvedValue(existingWorkLog);
    mockWorkLogRepository.save.mockResolvedValue(mockDeep<WorkLog>());

    const response = await request(app).patch(`/work-logs/${workLogId}`).send({ volume: 20.0 });

    expect(response.status).toBe(HttpStatusCode.Ok);
    expect(mockWorkLogRepository.getById).toHaveBeenCalledWith(workLogId);
    expect(mockWorkLogRepository.save).toHaveBeenCalledTimes(1);
  });

  it('Sad Path: должен вернуть 400 Bad Request, если реальный Zod завалил валидацию объема', async () => {
    const response = await request(app)
      .patch(`/work-logs/${workLogId}`)
      .send({ volume: 'not-a-number' });

    expect(response.status).toBe(HttpStatusCode.BadRequest);
    expect(mockWorkLogRepository.getById).not.toHaveBeenCalled();
  });

  it('Sad Path: должен вернуть 404 Not Found, если запись отсутствует в базе', async () => {
    mockWorkLogRepository.getById.mockImplementation(() => {
      throw new NotFoundError('WorkLog');
    });

    const response = await request(app).patch(`/work-logs/${workLogId}`).send({ volume: 25.0 });
    expect(response.status).toBe(HttpStatusCode.NotFound);
    expect(mockWorkLogRepository.save).not.toHaveBeenCalled();
  });

  it('Sad Path: errorHandler должен отдать 500 Internal Server Error на неизвестную ошибку', async () => {
    mockWorkLogRepository.getById.mockImplementation(() => {
      throw new Error();
    });

    const response = await request(app).patch(`/work-logs/${workLogId}`).send({ volume: 25.0 });

    expect(response.status).toBe(HttpStatusCode.InternalServerError);
    expect(response.body.error).toBe('INTERNAL_SERVER_ERROR');
  });
});
