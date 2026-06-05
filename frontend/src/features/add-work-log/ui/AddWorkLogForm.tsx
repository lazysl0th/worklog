import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Calendar, FileText, HardHat, AlignLeft } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useGetWorkTypesQuery, workTypeUnitSchema } from '@/entities';
import { Input, Button, Select } from '@/shared/ui';
import { Textarea } from '@/shared/ui/textarea/Textarea';

import { useAddWorkLogMutation } from '../api/addWorkLogApi';
import {
  addWorkLogSchema,
  createAddWorkLogFormSchema,
  type TAddWorkLogFormValues,
} from '../model/types';

export const AddWorkLogForm = () => {
  const { t } = useTranslation();
  const formSchema = createAddWorkLogFormSchema(t);

  const { data: workTypes = [], isLoading: isTypesLoading } = useGetWorkTypesQuery();
  const [addWorkLog, { isLoading: isMutating, error: serverError }] = useAddWorkLogMutation();

  const units = workTypeUnitSchema.options;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAddWorkLogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      volume: '',
      description: '',
      date: '',
      workTypeId: '',
      contractorId: '',
      unit: undefined,
    },
  });

  const onSubmit = async (data: TAddWorkLogFormValues) => {
    const result = addWorkLogSchema.safeParse(data);
    if (!result.success) return;
    await addWorkLog(result.data).unwrap();
    reset();
  };

  return (
    <div className="p-4 rounded-ui-container border border-ui-border-main bg-ui-bg-card shadow-xs">
      {/* Шапка страницы (в стиле сущности) */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/work-logs"
          className="flex h-9 w-9 items-center justify-center rounded-ui-control border border-ui-border-main bg-ui-bg-card text-ui-text-main hover:text-ui-text-heading hover:bg-ui-bg-hover transition-colors shadow-sm"
        >
          <ArrowLeft size={16} />
        </Link>
        <div className="space-y-0.5 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider">
            {t('workLog.form.subtitle')}
          </span>
          <h2 className="text-xl font-bold tracking-wide m-0">{t('workLog.form.title')}</h2>
        </div>
      </div>

      {/* Контейнер формы (повторяет внутренний блок сущности) */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-ui-container border border-ui-border-main bg-ui-bg-card p-6 space-y-6 text-left"
      >
        {/* Первый ряд: Исполнитель и Дата */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Дата выполнения работ */}
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control">
              <Calendar size={20} />
            </div>
            <div className="flex-1">
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <Input
                    type="date"
                    label={t('workLog.form.fields.date')}
                    error={errors.date?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          {/* Исполнитель */}
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control">
              <HardHat size={20} />
            </div>
            <div className="flex-1">
              <Controller
                control={control}
                name="contractorId"
                render={({ field }) => (
                  <Input
                    label={t('workLog.form.fields.contractor')}
                    error={errors.contractorId?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <hr className="border-ui-border-light" />

        {/* Второй ряд: Тип работ, Объем и Ед. изм. */}
        <div className="flex gap-4 items-start sm:items-center ">
          <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control">
            <FileText size={20} />
          </div>
          <div className="grid gap-4 sm:grid-cols-12 flex-1">
            <div className="sm:col-span-6">
              <Controller
                control={control}
                name="workTypeId"
                render={({ field }) => (
                  <Select
                    label={t('workLog.form.fields.workType')}
                    options={workTypes?.map((workType) => ({
                      label: workType.name,
                      value: workType.id,
                    }))}
                    disabled={isTypesLoading}
                    error={errors.workTypeId?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="sm:col-span-3">
              <Controller
                control={control}
                name="volume"
                render={({ field }) => (
                  <Input
                    label={t('workLog.form.fields.volume')}
                    error={errors.volume?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="sm:col-span-3">
              <Controller
                control={control}
                name="unit"
                render={({ field }) => (
                  <Select
                    label={t('workLog.form.fields.unit')}
                    options={units?.map((unit) => ({ label: unit, value: unit }))}
                    error={errors.unit?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <hr className="border-ui-border-light" />

        {/* Третий ряд: Описание */}
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control">
            <AlignLeft size={20} />
          </div>
          <div className="flex-1">
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  rows={4}
                  label={t('workLog.form.fields.description')}
                  error={errors.description?.message}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        {/* Ошибки сервера и кнопка отправки */}
        <div className="flex flex-col items-end gap-4 pt-2">
          {serverError && <p className="text-red-500 text-sm">{t('workLog.errors.serverError')}</p>}
          <Button type="submit" disabled={isMutating || isTypesLoading}>
            {isMutating ? t('common.loading') : t('workLog.form.submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};
