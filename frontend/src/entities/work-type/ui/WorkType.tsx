import { type ReactNode } from 'react';

import { cls } from '@/shared';

interface WorkTypeProps {
  readonly name: string;
  readonly className?: string;
}

export function WorkType({ name, className }: WorkTypeProps): ReactNode {
  return (
    <span
      className={cls(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/60',
        className,
      )}
    >
      <span className="font-semibold">{name}</span>
    </span>
  );
}
