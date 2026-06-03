import 'reflect-metadata';
import request from 'supertest';
import { describe, it, expect } from 'vitest';

import { app, mockWorkLogRepository, workLogId } from '../../../setup.js';

import HttpStatusCode from '#/infrastructure/http/contstants/httpStatusCode.js';

describe('API Integration: DELETE /work-logs (Delete)', () => {
  it('Happy Path: должен успешно удалить журналы, если валидация по Zod/Joi пройдена', async () => {
    mockWorkLogRepository.delete.mockResolvedValue({ count: 1 });

    const response = await request(app)
      .delete('/work-logs')
      .send({ ids: [workLogId] });

    expect(response.status).toBe(HttpStatusCode.NoContent);
    expect(mockWorkLogRepository.delete).toHaveBeenCalledWith([workLogId]);
  });

  it('Sad Path: должен вернуть 400 Bad Request, если реальный валидатор завернул некорректный body', async () => {
    const response = await request(app).delete('/work-logs').send({ ids: 'not-an-array' });

    expect(response.status).toBe(HttpStatusCode.BadRequest);
    expect(mockWorkLogRepository.delete).not.toHaveBeenCalled();
  });
});
