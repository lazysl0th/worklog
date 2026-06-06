import type { TFunction } from 'i18next';

import z from 'zod';

import { contractorSchema, workTypeSchema } from '@/shared';

export const workTypeUnitSchema = z.enum(['M3', 'M2', 'M', 'TON', 'KG', 'PCS', 'SECTION'], {});

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

export const workLogFormSchema = workLogSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    workType: true,
    contractor: true,
  })
  .extend({
    date: z.preprocess((val) => {
      if (val instanceof Date) {
        return val.toISOString().split('T')[0];
      }
      return val;
    }, z.string()),
    volume: z.string(),
    contractorId: z.uuid(),
    workTypeId: z.uuid(),
  });

export const createWorkLogFormValuesSchema = (t: TFunction) => {
  return workLogFormSchema.extend({
    date: z.preprocess(
      (val) => (typeof val === 'string' ? new Date(val) : val),
      z
        .date({
          error: (e) => {
            if (e.input === undefined) {
              return t('workLog.validation.dateRequired');
            }
            if (e.code === 'invalid_type') {
              return t('workLog.validation.dateInvalid');
            }
          },
        })
        .max(new Date(), { message: t('workLog.validation.dateInFuture') }),
    ),

    workTypeId: z.uuid({
      error: t('workLog.validation.workTypeRequired'),
    }),

    description: z
      .string()
      .min(1, { error: t('workLog.validation.descriptionRequired') })
      .max(1000, { error: t('workLog.validation.descriptionMaxLength') }),

    volume: z
      .string()
      .min(1, { message: t('workLog.validation.volumeRequired') })
      .refine((val) => !isNaN(parseFloat(val)), {
        message: t('workLog.validation.volumeInvalid'),
      })
      .refine((val) => parseFloat(val) > 0, {
        message: t('workLog.validation.volumeGreaterThanZero'),
      }),
    unit: workTypeUnitSchema
      .or(z.literal(''))
      .or(z.undefined())
      .refine((val) => val !== '' && val !== undefined, {
        message: t('workLog.validation.unitRequired'),
      }),

    contractorId: z.uuid({
      error: t('workLog.validation.contractorRequired'),
    }),
  });
};

export const updateWorkLogSchema = workLogFormSchema.extend({ id: workLogSchema.shape.id });

export const workLogFilterSortSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortBy: z.string().optional(),
  sortDesc: z.enum(['true', 'false']).optional(),
});
