import type { ReactNode } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AddWorkLogsButton } from '@/features/add-work-log';
import { DeleteWorkLogsButton } from '@/features/delete-work-log';
import { DateRangeFilter } from '@/features/filters-work-log';

import { getSelectedRows } from '../model/slice';

export function WorkLogToolbar(): ReactNode {
  const { t } = useTranslation();
  const selectedRows = useSelector(getSelectedRows);
  const selectedIds = Object.keys(selectedRows);
  const hasSelected = selectedIds.length > 0;

  return (
    <div className="flex items-center flex-wrap py-2 px-4 gap-4 border border-ui-border-main bg-ui-bg-card rounded-ui-container shadow-xs">
      <AddWorkLogsButton />
      <DeleteWorkLogsButton />

      <div className="flex items-center gap-3 min-h-10">
        {hasSelected && (
          <span className="text-xs font-medium opacity-60 animate-fade-in">
            {t('workLog.list.selectedCount', {
              count: selectedIds.length,
            })}
          </span>
        )}
      </div>
      <DateRangeFilter />
    </div>
  );
}
