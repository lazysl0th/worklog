import { z } from 'zod';

export const contractorSchema = z
  .object({
    id: z.uuid(),
    fullName: z.string().min(1),
  })
  .readonly();

export const workTypeSchema = z
  .object({
    id: z.uuid(),
    name: z.string().min(1),
  })
  .readonly();
