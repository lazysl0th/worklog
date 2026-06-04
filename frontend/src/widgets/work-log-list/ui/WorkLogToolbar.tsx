import type { ReactNode } from 'react';

import { useTranslation } from 'react-i18next';

interface WorkLogToolbarProps {
  selectedIds: string[];
  onDeleteSuccess: () => void;
}

export function WorkLogToolbar({
  selectedIds,
  // onDeleteSuccess,
}: WorkLogToolbarProps): ReactNode {
  const { t } = useTranslation();
  const hasSelected = selectedIds.length > 0;

  return (
    <div className="flex items-center justify-between p-4 border border-ui-border-main bg-ui-bg-card rounded-ui-container shadow-xs">
      <div className="flex items-center gap-3 min-h-10">
        {hasSelected && (
          <span className="text-xs font-medium opacity-60 animate-fade-in">
            {t('workLogList.selectedCount', 'Выбрано элементов: {{count}}', {
              count: selectedIds.length,
            })}
          </span>
        )}
      </div>

      <div className="flex items-center"></div>
    </div>
  );
}
