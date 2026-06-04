import type { Request, Response } from 'express';

import { describe, it, expect, vi } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';

import DomainError from '#/domain/errors/DomainError.js';
import HttpStatusCode from '#/infrastructure/http/contstants/httpStatusCode.js';
import errorsHandler from '#/infrastructure/http/middleware/errorsHandler.js';

describe('Middleware: errorsHandler', () => {
  it('Sad Path: errorHandler должен вызвать next(e), если заголовки ответа уже были отправлены', async () => {
    const error = new Error();

    const req = mockDeep<Request>();
    const res = mockDeep<Response>();
    const next = vi.fn();

    res.headersSent = true;

    errorsHandler(error, req, res, next);

    expect(next).toHaveBeenCalledWith(error);

    expect(res.status).not.toHaveBeenCalled();
  });

  it('Sad Path: должен корректно обрабатывать ситуацию, когда meta не найдена', async () => {
    class UnknownError extends DomainError {
      readonly code = 'SOME_RANDOM_CODE';
      constructor() {
        super('msg');
      }
    }
    const error = new UnknownError();

    const req = mockDeep<Request>();
    const res = mockDeep<Response>();
    const next = vi.fn();
    res.status.mockReturnThis();
    res.headersSent = false;
    errorsHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(HttpStatusCode.InternalServerError);
    expect(res.send).toHaveBeenCalledWith({
      error: 'INTERNAL_SERVER_ERROR',
      i18nKey: 'errors.system.internal',
    });
  });
});
