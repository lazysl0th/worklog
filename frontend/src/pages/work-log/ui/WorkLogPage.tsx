import type { ReactNode } from 'react';

import { skipToken } from '@reduxjs/toolkit/query';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useGetWorkLogQuery, WorkLog } from '@/entities/work-log';

export function WorkLogPage(): ReactNode {
  const { id } = useParams<{ readonly id: string }>();
  const { t } = useTranslation();

  const { data: workLog } = useGetWorkLogQuery(id ? id : skipToken);

  if (!id || !workLog) {
    return (
      <div className="text-center py-12 opacity-60">
        {t('errors.missingId', 'Запись не найдена')}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WorkLog workLog={workLog} />
    </div>
  );
}
