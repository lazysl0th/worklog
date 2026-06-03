import type { Request, Response } from 'express';
import { describe, it, expect, vi } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';
import { z } from 'zod';

import validate from '#/infrastructure/http/middleware/validation.js';

describe('Middleware: validation', () => {
  it('должен обновить req.body, req.params и req.query', async () => {
    const schema = z.object({
      body: z.object({ foo: z.string() }),
      query: z.object({ bar: z.string() }),
      params: z.object({ id: z.string() }),
    });

    const req = mockDeep<Request>();
    const res = mockDeep<Response>();
    const next = vi.fn();

    const middleware = validate(schema);

    req.body = { foo: 'baz' };
    req.query = { bar: 'qux' };
    req.params = { id: '1' };

    await middleware(req, res, next);

    expect(req.body.foo).toBe('baz');
    expect(req.query.bar).toBe('qux');
    expect(req.params.id).toBe('1');
    expect(next).toHaveBeenCalled();
  });

  it('не должен изменять req, если результат парсинга не является объектом', async () => {
    const req = mockDeep<Request>();
    const res = mockDeep<Response>();
    const next = vi.fn();

    req.body = { foo: 'baz' };
    req.query = { bar: 'qux' };
    req.params = { id: '1' };

    const schema = z.preprocess(() => 123, z.any());

    const middleware = validate(schema);
    await middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.body).toEqual({ foo: 'baz' });
    expect(req.query).toEqual({ bar: 'qux' });
    expect(req.params).toEqual({ id: '1' });
  });
});
