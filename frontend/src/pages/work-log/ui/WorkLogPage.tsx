import { skipToken } from '@reduxjs/toolkit/query';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { useGetWorkLogQuery, WorkLog } from '@/entities/work-log';
import { UpdateWorkLogForm } from '@/features/update-work-log';
import { Button } from '@/shared/ui';

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
    <div
      className={`p-4 rounded-ui-container border border-ui-border-main bg-ui-bg-card shadow-xs`}
    >
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="/work-logs"
          className="flex h-9 w-9 items-center justify-center rounded-ui-control border border-ui-border-main bg-ui-bg-card text-ui-text-main hover:text-ui-text-heading hover:bg-ui-bg-hover transition-colors shadow-sm"
        >
          <ArrowLeft size={16} />
        </Link>
        <div className="space-y-0.5 text-left">
          <span className="text-xs font-semibold uppercase tracking-wider">
            {t('workLog.entity.subtitle')}
          </span>
          <h2 className="text-xl font-bold tracking-wide m-0">
            {t('workLog.entity.title')} #{workLog.id}
          </h2>
        </div>
        {!isEdit && (
          <Button type="button" onClick={() => setIsEdit(true)}>
            <Pencil size={14} />
          </Button>
        )}
      </div>

      {isEdit ? (
        <UpdateWorkLogForm id={id} workLog={workLog} onComplete={() => setIsEdit(false)} />
      ) : (
        <WorkLog workLog={workLog} />
      )}
    </div>
  );
}
