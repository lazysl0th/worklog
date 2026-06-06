import type { TWorkLog, TWorkLogFormValues } from '@/entities/work-log';

export function mapWorkLogToForm(workLog: TWorkLog): TWorkLogFormValues {
  return {
    date: new Date(workLog.date).toISOString().split('T')[0],
    contractorFullName: workLog.contractor.fullName,
    workTypeId: workLog.workType.id,
    volume: String(workLog.volume),
    unit: workLog.unit,
    description: workLog.description ?? '',
  };
}
