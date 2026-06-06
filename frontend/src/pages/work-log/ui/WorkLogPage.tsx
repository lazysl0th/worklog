import { skipToken } from '@reduxjs/toolkit/query';
import { Pencil, Ban } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useGetWorkLogQuery, WorkLog } from '@/entities/work-log';
import { UpdateWorkLogForm } from '@/features/update-work-log';
import { Button } from '@/shared/ui';

import { WorkLogPageHeader } from './WorkLogHeader';

export function WorkLogPage(): ReactNode {
  const { id } = useParams<{ readonly id: string }>();
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { data: workLog } = useGetWorkLogQuery(id ? id : skipToken);

  if (!id || !workLog) {
    return (
      <div className="text-center py-12 opacity-60">
        {t('errors.missingId', 'Запись не найдена')}
      </div>
    );
  }

  return (
    <div className="p-4 rounded-ui-container border border-ui-border-main bg-ui-bg-card shadow-xs">
      <WorkLogPageHeader
        title={t('workLog.entity.title')}
        subtitle={t('workLog.entity.subtitle')}
        workLogId={id}
      >
        {!isEdit ? (
          <Button type="button" onClick={() => setIsEdit(true)} variant="link" className="ml-auto">
            <Pencil size={16} />
          </Button>
        ) : (
          <Button type="button" onClick={() => setIsEdit(false)} variant="link" className="ml-auto">
            <Ban size={16} />
          </Button>
        )}
      </WorkLogPageHeader>

      {isEdit ? (
        <UpdateWorkLogForm id={id} workLog={workLog} onComplete={() => setIsEdit(false)} />
      ) : (
        <WorkLog workLog={workLog} />
      )}
    </div>
  );
}
