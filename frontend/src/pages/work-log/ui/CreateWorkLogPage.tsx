import type { ReactNode } from 'react';

import { useTranslation } from 'react-i18next';

import { AddWorkLogForm } from '@/features/add-work-log';

import { WorkLogPageHeader } from './WorkLogHeader';

export function CreateWorkLogPage(): ReactNode {
  const { t } = useTranslation();

  return (
    <div className="p-4 rounded-ui-container border border-ui-border-main bg-ui-bg-card shadow-xs">
      <WorkLogPageHeader title={t('workLog.form.title')} subtitle={t('workLog.form.subtitle')} />
      <AddWorkLogForm />
    </div>
  );
}
