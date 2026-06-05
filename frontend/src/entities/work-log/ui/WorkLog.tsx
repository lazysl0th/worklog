import { ArrowLeft, Calendar, FileText, HardHat, AlignLeft } from 'lucide-react';
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
      </div>

      <div className="rounded-ui-container border border-ui-border-main bg-ui-bg-card p-6 space-y-6 text-left">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control">
              <Calendar size={20} />
            </div>
            <div className="flex-1 flex gap-1 flex-col">
              <span className="text-sm self-start font-medium text-ui-text-heading">
                {t('workLog.form.fields.date')}
              </span>
              <span>{workLog.date.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control">
              <HardHat size={20} />
            </div>
            <div className="flex-1 flex gap-1 flex-col">
              <span className="text-sm self-start font-medium text-ui-text-heading">
                {t('workLog.form.fields.contractor')}
              </span>
              <span>{contractor}</span>
            </div>
          </div>
        </div>

        <hr className="border-ui-border-light" />

        <div className="flex gap-4 items-start sm:items-center">
          <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control">
            <FileText size={20} />
          </div>
          <div className="grid gap-4 sm:grid-cols-12 flex-1">
            <div className="sm:col-span-6">
              <span className="text-sm self-start font-medium text-ui-text-heading">
                {t('workLog.form.fields.workType')}
              </span>
              <div>{workType}</div>
            </div>
            <div className="sm:col-span-3 flex-1 flex gap-1 flex-col">
              <span className="text-sm self-start font-medium text-ui-text-heading">
                {t('workLog.form.fields.volume')}
              </span>
              <span>{workLog.volume}</span>
            </div>
            <div className="sm:col-span-3 flex-1 flex gap-1 flex-col">
              <span className="text-sm self-start font-medium text-ui-text-heading">
                {t('fields.unit', 'Ед. изм.')}
              </span>
              <span>{workLog.unit}</span>
            </div>
          </div>
        </div>

        <hr className="border-ui-border-light" />

        <div className="flex gap-4 items-start">
          <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control">
            <AlignLeft size={20} />
          </div>
          <div className=" flex-1 flex gap-1 flex-col">
            <span className="text-sm self-start font-medium text-ui-text-heading">
              {t('workLog.form.fields.description')}
            </span>
            <p>{workLog.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
