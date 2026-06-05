import type z from 'zod';

import type { contractorSchema } from '@/shared/api';

export type TContractorType = z.infer<typeof contractorSchema>;
