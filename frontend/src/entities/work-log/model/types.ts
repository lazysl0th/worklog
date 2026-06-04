import { z } from 'zod';

export const workTypeUnitSchema = z.enum(['M3', 'M2', 'M', 'TON', 'KG', 'PCS', 'SECTION']);

export const workLogSchema = z
  .object({
    id: z.uuid(),
    date: z.date(),
    workTypeId: z.uuid(),
    volume: z.number().positive(),
    unit: workTypeUnitSchema,
    contractorId: z.uuid(),
    description: z.string().trim().nullable().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .readonly();

export type TWorkTypeUnit = z.infer<typeof workTypeUnitSchema>;

export type TWorkLog = z.infer<typeof workLogSchema>;
