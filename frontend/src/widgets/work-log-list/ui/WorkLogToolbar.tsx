import type { ReactNode } from 'react';

import { Plus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '@/shared';

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
    <div className="flex items-center p-4 gap-4 border border-ui-border-main bg-ui-bg-card rounded-ui-container shadow-xs">
      <Link to="/work-logs/create">
        <Button variant="link">
          <Plus className="size-5 text-green-600 dark:text-green-500" onClick={() => {}} />
        </Button>
      </Link>

      <Button variant="link">
        <X className="size-5 text-red-600 dark:text-red-500" onClick={() => {}} />
      </Button>

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
