import React from 'react';
import { useTranslation } from 'react-i18next';

interface WorkLogToolbarProps {
  selectedIds: string[];
  onDeleteSuccess: () => void;
}

export function WorkLogToolbar({
  selectedIds,
  //onDeleteSuccess,
}: WorkLogToolbarProps): React.JSX.Element {
  const { t } = useTranslation();
  const hasSelected = selectedIds.length > 0;

  return (
    <div className="flex items-center justify-between p-4 border-ui-border-main bg-ui-bg-hover">
      <div className="flex items-center gap-3 min-h-10">
        {hasSelected && (
          <span className="text-xs font-medium text-gray-500 animate-fade-in">
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
