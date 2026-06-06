import type { ReactNode } from 'react';

import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export function MainLayout(): ReactNode {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <header className="flex h-16 items-center border-b border-ui-border-main bg-ui-bg-header/90 backdrop-blur-sm px-6">
        <h1 className="m-0 text-base font-semibold text-ui-text-heading truncate min-w-0">
          {t('app.title')}
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto p-6 focus:outline-none">
        <Outlet />
      </main>
    </div>
  );
}
