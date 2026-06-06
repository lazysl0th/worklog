import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useGetWorkTypesQuery } from '@/entities';
import { WorkLogForm, type TWorkLogFormValues } from '@/entities/work-log';
import { useGetUnitsQuery, workLogFormSchema } from '@/entities/work-log';

import { useAddWorkLogMutation } from '../api/addWorkLogApi';

export const AddWorkLogForm = () => {
  const { t } = useTranslation();

  const { data: workTypes = [], isLoading: isTypesLoading } = useGetWorkTypesQuery();
  const { data: units = [], isLoading: isUnitsLoading } = useGetUnitsQuery();
  const [addWorkLog, { isLoading: isMutating, error: serverError }] = useAddWorkLogMutation();

  const defaultValues = {
    volume: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    contractorId: '',
  };

  const onSubmit = async (data: TWorkLogFormValues) => {
    const result = workLogFormSchema.safeParse(data);
    if (!result.success) return;
    await addWorkLog(result.data).unwrap();
  };

  return (
    <div className="p-4 rounded-ui-container border border-ui-border-main bg-ui-bg-card shadow-xs">
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
      <WorkLogForm
        defaultValues={defaultValues}
        isSubmitting={isMutating}
        serverError={serverError}
        submitButtonText={t('workLog.form.submit')}
        onSubmit={onSubmit}
        workTypes={workTypes}
        units={units}
        isDictionariesLoading={isTypesLoading || isUnitsLoading}
      />
    </div>
  );
};
