import { z } from 'zod';

export const contractorSchema = z
  .object({
    id: z.string(),
    name: z.string().min(1),
  })
  .readonly();

export type TContractorType = z.infer<typeof contractorSchema>;
