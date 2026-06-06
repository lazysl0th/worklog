import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { ReactNode } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlignLeft, Calendar, FileText, HardHat } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Input, Select } from '@/shared/ui';
import { Textarea } from '@/shared/ui';

import type { TWorkLogFormValues } from '../model/types';

import { createWorkLogFormValuesSchema } from '../model/schemas';

interface WorkLogFormProps {
  readonly defaultValues?: Partial<TWorkLogFormValues>;
  readonly isSubmitting: boolean;
  readonly serverError?: FetchBaseQueryError | SerializedError | undefined;
  readonly submitButtonText: string;
  readonly onSubmit: (data: TWorkLogFormValues) => void;
  readonly workTypes: Array<{ readonly id: string; readonly name: string }>;
  readonly units: ReadonlyArray<string>;
  readonly isDictionariesLoading?: boolean;
}

export function WorkLogForm({
  defaultValues,
  isSubmitting,
  submitButtonText,
  onSubmit,
  serverError,
  workTypes,
  units,
  isDictionariesLoading = false,
}: WorkLogFormProps): ReactNode {
  const { t } = useTranslation();

  const formSchema = createWorkLogFormValuesSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TWorkLogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onTouched',
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-ui-container border border-ui-border-main bg-ui-bg-card p-6 space-y-6 text-left"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control">
            <Calendar size={20} />
          </div>
          <div className="flex-1">
            <Input
              type="date"
              label={t('workLog.form.fields.date')}
              error={errors.date?.message}
              {...register('date')}
            />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control">
            <HardHat size={20} />
          </div>
          <div className="flex-1">
            <Input
              label={t('workLog.form.fields.contractor')}
              error={errors.contractorFullName?.message}
              {...register('contractorFullName')}
            />
          </div>
        </div>
      </div>
      <hr className="border-ui-border-light" />

      <div className="flex gap-4 items-start sm:items-center ">
        <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control">
          <FileText size={20} />
        </div>
        <div className="grid gap-4 sm:grid-cols-12 flex-1">
          <div className="sm:col-span-6">
            <Select
              label={t('workLog.form.fields.workType')}
              options={workTypes?.map((workType) => ({
                label: workType.name,
                value: workType.id,
              }))}
              disabled={isDictionariesLoading}
              error={errors.workTypeId?.message}
              {...register('workTypeId')}
            />
          </div>
          <div className="sm:col-span-3">
            <Input
              label={t('workLog.form.fields.volume')}
              error={errors.volume?.message}
              {...register('volume')}
            />
          </div>
          <div className="sm:col-span-3">
            <Select
              label={t('workLog.form.fields.unit')}
              options={units?.map((unit) => ({ label: unit, value: unit }))}
              error={errors.unit?.message}
              disabled={isDictionariesLoading}
              {...register('unit')}
            />
          </div>
        </div>
      </div>

      <hr className="border-ui-border-light" />

      <div className="flex gap-4 items-start">
        <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control">
          <AlignLeft size={20} />
        </div>
        <div className="flex-1">
          <Textarea
            rows={4}
            label={t('workLog.form.fields.description')}
            error={errors.description?.message}
            {...register('description')}
          />
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 pt-2">
        {serverError && <p className="text-red-500 text-sm">{t('errors.server')}</p>}
        <Button type="submit" disabled={isSubmitting || isDictionariesLoading}>
          {isSubmitting ? t('common.loading') : submitButtonText}
        </Button>
      </div>
    </form>
  );
}
