import type { Request, Response } from 'express';

import { describe, it, expect, vi } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';

import ForbiddenError from '#/domain/errors/ForbiddenError.js';
import HttpStatusCode from '#/infrastructure/http/contstants/httpStatusCode.js';
import errorsHandler from '#/infrastructure/http/middleware/errorsHandler.js';

describe('Unit: Frobidden Error', () => {
  it('должен возвращать 403 при выбросе ForbiddenError', async () => {
    const req = mockDeep<Request>();
    const res = mockDeep<Response>();
    const next = vi.fn();
    res.status.mockReturnThis();
    res.headersSent = false;

    const forbiddenError = new ForbiddenError();

    errorsHandler(forbiddenError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(HttpStatusCode.Forbidden);
  });
});
