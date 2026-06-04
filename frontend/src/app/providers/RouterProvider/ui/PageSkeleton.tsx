import type { ReactNode } from 'react';

export function PageSkeleton(): ReactNode {
  return (
    <div
      className="space-y-6 animate-pulse p-2"
      role="status"
      aria-label="Загрузка компонентов страницы"
    >
      <div className="h-7 bg-ui-border-main rounded-ui-control w-1/4 min-w-45" />

      <div className="space-y-3">
        <div className="h-4 bg-ui-border-light rounded-ui-control" />
        <div className="h-4 bg-ui-border-light rounded-ui-control w-11/12" />
      </div>

      <div className="h-72 bg-ui-border-main rounded-ui-container" />
    </div>
  );
}
