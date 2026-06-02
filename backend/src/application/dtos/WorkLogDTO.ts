import { z } from 'zod';

import { EnumMeasurementValue } from '#/domain/ value-objects/MeasurementUnit.js';

export const createWorkLogSchema = z.object({
  date: z.date(),
  workTypeId: z.uuid(),
  volume: z.number().positive(),
  unit: z.enum(Object.values(EnumMeasurementValue)),
  contractorId: z.uuid(),
});

export const updateWorkLogSchema = createWorkLogSchema.partial().extend({
  id: z.uuid(),
});

export const deleteWorkLogSchema = updateWorkLogSchema.pick({
  id: true,
});

export const getWorkLogsFilterSchema = z
  .object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    contractorId: z.uuid().optional(),
  })
  .refine(
    (data) =>
      data.contractorId !== undefined ||
      (data.startDate !== undefined && data.endDate !== undefined),
    { message: 'Must provide either contractorId, or both startDate and endDate' },
  );

export type TCreateWorkLogDto = z.infer<typeof createWorkLogSchema>;

export type TUpdateWorkLogDto = z.infer<typeof updateWorkLogSchema>;

export type TDeleteWorkLogDto = z.infer<typeof deleteWorkLogSchema>;

export type TGetWorkLogsFilterDto = z.infer<typeof getWorkLogsFilterSchema>;
