import { array, z } from 'zod';

import { EnumMeasurementValue } from '#/domain/value-objects/MeasurementUnit.js';

export const getWorkLogsSchema = z.object({
  query: z.object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    sortByDate: z.enum(['asc', 'desc']).optional(),
  }),
});

export const createWorkLogSchema = z.object({
  body: z.object({
    date: z.coerce.date(),
    workTypeId: z.uuid(),
    volume: z.coerce.number().positive(),
    unit: z.enum(Object.values(EnumMeasurementValue)),
    contractorId: z.uuid(),
  }),
});

export const updateWorkLogSchema = createWorkLogSchema.extend({
  params: z.object({
    id: z.uuid(),
  }),
  body: createWorkLogSchema.shape.body.partial(),
});

export const deleteWorkLogSchema = z.object({
  body: z.object({
    id: array(z.uuid()),
  }),
});

export const deleteWorkLogsSchema = updateWorkLogSchema.pick({ params: true });

export type TGetWorkLogsDto = z.infer<typeof getWorkLogsSchema>['query'];

export type TCreateWorkLogDto = z.infer<typeof createWorkLogSchema>['body'];

export type TUpdateWorkLogParams = z.infer<typeof updateWorkLogSchema>['params'];

export type TUpdateWorkLogBody = z.infer<typeof updateWorkLogSchema>['body'];

export type TUpdateWorkLogDto = TUpdateWorkLogParams & TUpdateWorkLogBody;

export type TDeleteWorkLogDto = z.infer<typeof deleteWorkLogSchema>['body'];
