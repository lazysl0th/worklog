import { ArrowLeft } from 'lucide-react';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface WorkLogHeaderProps {
  title: string;
  subtitle: string;
  workLogId?: string;
  children?: ReactNode;
}

export function WorkLogPageHeader({
  title,
  subtitle,
  workLogId,
  children,
}: WorkLogHeaderProps): ReactNode {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Link
        to="/work-logs"
        className="flex h-9 w-9 items-center justify-center rounded-ui-control border border-ui-border-main bg-ui-bg-card text-ui-text-main hover:text-ui-text-heading hover:bg-ui-bg-hover transition-colors shadow-sm"
      >
        <ArrowLeft size={16} />
      </Link>
      <div className="space-y-0.5 text-left">
        <span className="text-xs font-semibold uppercase tracking-wider">{subtitle}</span>
        <h2 className="text-xl font-bold tracking-wide m-0">
          {title} {workLogId ? `#${workLogId}` : ''}
        </h2>
      </div>
      {children}
    </div>
  );
}
