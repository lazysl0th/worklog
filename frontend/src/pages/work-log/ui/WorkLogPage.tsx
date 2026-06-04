import type { ReactNode } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { WorkLog, type TWorkLog } from '@/entities/work-log';

export function WorkLogPage(): ReactNode {
  const { id } = useParams<{ readonly id: string }>();
  const { t } = useTranslation('workLogDetails');

  if (!id) {
    return (
      <div className="text-center py-12 opacity-60">
        {t('errors.missingId', 'Идентификатор записи не указан')}
      </div>
    );
  }
  const mockData: TWorkLog = {
    id: id ?? 'unknown',
    date: new Date('05.06.2026'),
    contractorId: 'ООО «МонолитСтрой»',
    workTypeId: 'Укладка бетонной смеси B25',
    volume: 120,
    unit: 'M3',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div className="space-y-6">
      <WorkLog workLog={mockData} />
    </div>
  );
}
