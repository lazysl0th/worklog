import { Calendar, FileText, HardHat, AlignLeft } from 'lucide-react';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { type TWorkLog } from '../model/types';

interface WorkLogProps {
  readonly workLog: TWorkLog;
  readonly className?: string;
}

export function WorkLog({ workLog, className = '' }: WorkLogProps): ReactNode {
  const { t } = useTranslation();

  return (
    <div
      className={`rounded-ui-container border border-ui-border-main bg-ui-bg-card p-6 space-y-6 text-left ${className}`}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-ui-border-light border border-ui-border-main rounded-ui-control">
            <Calendar size={20} />
          </div>
          <div className="flex-1 flex gap-1 flex-col">
            <span className="text-sm self-start font-medium text-ui-text-heading">
              {t('workLog.form.fields.date')}
            </span>
            <span>{new Date(workLog.date).toLocaleDateString()}</span>
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
            <span>{workLog.contractor.fullName}</span>
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
            <div>{workLog.workType.name}</div>
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
  );
}
