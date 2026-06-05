import type { TFunction } from 'i18next';

import { z } from 'zod';

import { workLogSchema, workTypeUnitSchema, type TWorkTypeUnit } from '@/entities/work-log';

export const addWorkLogSchema = workLogSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    workType: true,
    contractor: true,
  })
  .extend({
    date: z.coerce.date(),
    volume: z.coerce.number(),
    contractorId: z.uuid(),
    workTypeId: z.uuid(),
  });

export const createAddWorkLogFormSchema = (t: TFunction) => {
  return addWorkLogSchema.extend({
    date: z
      .string()
      .min(1, { message: t('addWorkLog.validation.dateRequired') })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: t('addWorkLog.validation.dateInvalid'),
      }),

    workTypeId: z.uuid({
      error: t('addWorkLog.validation.workTypeRequired'),
    }),

    description: z
      .string()
      .min(1, { error: t('addWorkLog.validation.descriptionRequired') })
      .max(1000, { error: t('addWorkLog.validation.descriptionMaxLength') }),

    volume: z
      .string()
      .min(1, { message: t('addWorkLog.validation.volumeRequired') })
      .refine(
        (val) => {
          const num = Number(val.replace(',', '.')); // на случай если введут запятую вместо точки
          return !isNaN(num) && num > 0;
        },
        {
          message: t('addWorkLog.validation.volumeGreaterThanZero'),
        },
      ),
    unit: workTypeUnitSchema.optional().refine((val): val is TWorkTypeUnit => val !== undefined, {
      message: t('addWorkLog.validation.unitRequired'),
    }),

    contractorId: z.uuid({
      error: t('addWorkLog.validation.contractorRequired'),
    }),
  });
};

export type TCreateWorkLogDto = z.infer<typeof addWorkLogSchema>;

export type TAddWorkLogFormValues = z.input<ReturnType<typeof createAddWorkLogFormSchema>>;
