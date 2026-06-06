import type { ReactNode } from 'react';

import { useGetWorkTypesQuery } from '@/entities';
import {
  useGetUnitsQuery,
  WorkLogForm,
  type TWorkLogFormValues,
  type TWorkLog,
  workLogFormSchema,
} from '@/entities/work-log';

import { useUpdateWorkLogMutation } from '../api/updateWorkLogApi';
import { mapWorkLogToForm } from '../lib/mapWorkLogToForm';

interface UpdateWorkLogFormProps {
  readonly id: string;
  readonly workLog: TWorkLog;
  readonly onComplete: () => void;
}

export function UpdateWorkLogForm({ id, workLog, onComplete }: UpdateWorkLogFormProps): ReactNode {
  const { data: workTypes = [], isLoading: isTypesLoading } = useGetWorkTypesQuery();
  const { data: units = [], isLoading: isUnitsLoading } = useGetUnitsQuery();
  const [updateWorkLog, { isLoading, error }] = useUpdateWorkLogMutation();

  const initialData = mapWorkLogToForm(workLog);

  const handleUpdate = (data: TWorkLogFormValues): void => {
    const result = workLogFormSchema.safeParse(data);
    if (!result.success) return;
    try {
      updateWorkLog({ id, ...result.data }).unwrap();
    } catch (error) {
      console.log(error);
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
