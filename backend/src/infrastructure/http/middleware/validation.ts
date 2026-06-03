import type { RequestHandler } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { ParsedQs } from 'qs';
import type z from 'zod';

interface ValidatedRequest {
  body?: unknown;
  params?: ParamsDictionary;
  query?: ParsedQs;
}

export function isValidatedRequest(value: unknown): value is ValidatedRequest {
  return typeof value === 'object' && value !== null;
}

const validate =
  (schema: z.ZodTypeAny): RequestHandler =>
  async (req, _, next): Promise<void> => {
    const result = await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (isValidatedRequest(result)) {
      if (result.body !== undefined) {
        req.body = result.body;
      }
      if (result.params !== undefined) {
        req.params = result.params;
      }
      if (result.query !== undefined) {
        Object.defineProperty(req, 'query', {
          value: result.query,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }
    }
    next();
  };

export default validate;
