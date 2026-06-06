import type { ReactNode } from 'react';

import { useTranslation } from 'react-i18next';

import { useGetWorkTypesQuery } from '@/entities';
import {
  useGetUnitsQuery,
  WorkLogForm,
  type TWorkLogFormValues,
  type TWorkLog,
  workLogFormSchema,
} from '@/entities/work-log';
import { toast } from '@/shared/ui';

import { useUpdateWorkLogMutation } from '../api/updateWorkLogApi';
import { mapWorkLogToForm } from '../lib/mapWorkLogToForm';

interface UpdateWorkLogFormProps {
  readonly id: string;
  readonly workLog: TWorkLog;
  readonly onComplete: () => void;
}

export function UpdateWorkLogForm({ id, workLog, onComplete }: UpdateWorkLogFormProps): ReactNode {
  const { t } = useTranslation();
  const { data: workTypes = [], isLoading: isTypesLoading } = useGetWorkTypesQuery();
  const { data: units = [], isLoading: isUnitsLoading } = useGetUnitsQuery();
  const [updateWorkLog, { isLoading, error }] = useUpdateWorkLogMutation();

  const initialData = mapWorkLogToForm(workLog);

  const handleUpdate = async (data: TWorkLogFormValues): Promise<void> => {
    try {
      const result = workLogFormSchema.safeParse(data);
      if (!result.success) return;
      await updateWorkLog({ id, ...result.data }).unwrap();
      toast.success(t('workLog.notifications.updateSuccess'));
    } catch (e) {
      console.error(e);
      toast.error(t('workLog.notifications.updateError'));
    } finally {
      onComplete();
    }
  };

  return (
    <WorkLogForm
      defaultValues={initialData}
      isSubmitting={isLoading}
      submitButtonText="Сохранить изменения"
      onSubmit={handleUpdate}
      serverError={error}
      workTypes={workTypes}
      units={units}
      isDictionariesLoading={isTypesLoading || isUnitsLoading}
    />
  );
}
