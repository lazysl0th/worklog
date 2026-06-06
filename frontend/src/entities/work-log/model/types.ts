import type { z } from 'zod';

import type {
  createWorkLogFormValuesSchema,
  updateWorkLogSchema,
  workLogFilterSortSchema,
  workLogFormSchema,
  workLogSchema,
  workTypeUnitSchema,
} from './schemas';

export type TWorkTypeUnit = z.infer<typeof workTypeUnitSchema>;

export type TWorkLog = z.infer<typeof workLogSchema>;

export type TWorkLogCreateDto = z.infer<typeof workLogFormSchema>;

export type TWorkLogUpdateDto = z.infer<typeof updateWorkLogSchema>;

export type TWorkLogFormValues = z.input<ReturnType<typeof createWorkLogFormValuesSchema>>;

export type TWorkLogFilterSortDto = z.infer<typeof workLogFilterSortSchema>;
