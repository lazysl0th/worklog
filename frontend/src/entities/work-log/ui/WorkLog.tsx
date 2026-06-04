import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { cls } from '@/shared';

import { type TWorkLog } from '../model/types';

interface WorkLogProps {
  readonly workLog: TWorkLog;
  readonly workType?: ReactNode;
  readonly contractror?: ReactNode;
  readonly className?: string;
}

export function WorkLog({ workLog, workType, contractror, className }: WorkLogProps): ReactNode {
  const { t } = useTranslation();

  return (
    <div
      className={cls(
        'p-4 rounded-xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="space-y-1">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {workLog.date.toLocaleDateString()}
          </span>
          {workType && (
            <div className="flex items-center gap-2 flex-wrap">
              {workType}
              <span className="text-blue-500/80 dark:text-blue-400/80">
                ({t(`units.${workLog.unit}`)})
              </span>
            </div>
          )}
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-400 block">{t('workLog.volume')}</span>
          <span className="text-sm font-bold text-gray-900 dark:text-gray-50">
            {workLog.volume}
          </span>
        </div>
      </div>

      <div className="space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800/60">
        <div>
          <span className="text-xs font-semibold text-gray-400 block mb-0.5">
            {t('workLog.contractor')}
          </span>
          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{contractror}</p>
        </div>

        {workLog.description && (
          <div>
            <span className="text-xs font-semibold text-gray-400 block mb-0.5">
              {t('workLog.description')}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-400 wrap-break-word line-clamp-3">
              {workLog.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
