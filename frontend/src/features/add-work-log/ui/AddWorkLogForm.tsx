import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useGetWorkTypesQuery } from '@/entities';
import { WorkLogForm, type TWorkLogFormValues } from '@/entities/work-log';
import { useGetUnitsQuery, workLogFormSchema } from '@/entities/work-log';
import { toast } from '@/shared/ui';

import { useAddWorkLogMutation } from '../api/addWorkLogApi';

export const AddWorkLogForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    try {
      const result = workLogFormSchema.safeParse(data);
      if (!result.success) return;
      const workLog = await addWorkLog(result.data).unwrap();
      navigate(`/work-logs/${workLog.id}`, { replace: true });
      toast.success(t('workLog.notifications.createSuccess'));
    } catch (e) {
      console.error(e);
      toast.success(t('workLog.notifications.createError'));
    }
  };

  return (
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
  );
};
