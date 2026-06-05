import { z } from 'zod';

import { contractorSchema, workTypeSchema } from '@/shared/api';

export const workTypeUnitSchema = z.enum(['M3', 'M2', 'M', 'TON', 'KG', 'PCS', 'SECTION']);

export const workLogSchema = z.object({
  id: z.uuid(),
  date: z.date(),
  workType: workTypeSchema,
  volume: z.number(),
  unit: workTypeUnitSchema,
  contractor: contractorSchema,
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TWorkTypeUnit = z.infer<typeof workTypeUnitSchema>;

export type TWorkLog = z.infer<typeof workLogSchema>;
