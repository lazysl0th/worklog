import { ArrowLeft, Calendar, FileText, HardHat } from 'lucide-react';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { type TWorkLog } from '../model/types';

interface WorkLogProps {
  readonly workLog: TWorkLog;
  readonly workType?: ReactNode;
  readonly contractor?: ReactNode;
  readonly className?: string;
}

export function WorkLog({
  workLog,
  workType,
  contractor,
  className = '',
}: WorkLogProps): ReactNode {
  const { t } = useTranslation();

  return (
    <div
      className={`p-4 rounded-ui-container border border-ui-border-main bg-ui-bg-card shadow-xs ${className}`.trim()}
    >
      {/* Шапка страницы */}
      <div className="flex items-center gap-4">
        <Link
          to="/work-logs"
          className="flex h-9 w-9 items-center justify-center rounded-ui-control border border-ui-border-main bg-ui-bg-card text-ui-text-main hover:text-ui-text-heading hover:bg-ui-bg-hover transition-colors shadow-sm"
        >
          <ArrowLeft size={16} />
        </Link>
        <div className="space-y-0.5 text-left">
          <span className="text-xs font-semibold text-ui-accent-solid uppercase tracking-wider">
            {t('meta.entry', 'Запись')} #{workLog.id}
          </span>
          <h2 className="text-xl font-bold tracking-wide m-0">
            {t('title', 'Детальная информация о работе')}
          </h2>
        </div>
      </div>

      <div className="rounded-ui-container border border-ui-border-main bg-ui-bg-card p-6 space-y-6 text-left">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control text-ui-accent-solid">
              <HardHat size={20} />
            </div>
            <div className="space-y-1">
              <span className="text-xs opacity-60 block">
                {t('fields.contractor', 'Исполнитель')}
              </span>
              <span className="text-sm font-medium text-ui-text-heading">{contractor}</span>
            </div>
          </div>

          {/* Дата */}
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control text-ui-accent-solid">
              <Calendar size={20} />
            </div>
            <div className="space-y-1">
              <span className="text-xs opacity-60 block">
                {t('fields.date', 'Дата выполнения работ')}
              </span>
              <span className="text-sm font-medium text-ui-text-heading">
                {workLog.date.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <hr className="border-ui-border-light" />

        <div className="flex gap-4 items-start">
          <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control text-ui-accent-solid">
            <FileText size={20} />
          </div>
          <div className="space-y-1">
            <span className="text-xs opacity-60 block">{t('fields.workType', 'Тип работ')}</span>
            <p className="text-sm leading-relaxed">{workType}</p>
          </div>
        </div>

        <hr className="border-ui-border-light" />
      </div>
    </div>
  );
}
