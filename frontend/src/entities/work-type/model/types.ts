import type z from 'zod';

import type { workTypeSchema } from '@/shared/api';

export type TWorkType = z.infer<typeof workTypeSchema>;
