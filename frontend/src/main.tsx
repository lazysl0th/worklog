import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/App';

import { i18n } from './shared';

const container = document.getElementById('root');

if (!container) {
  throw new Error(i18n.t('errors.critical'));
}

createRoot(container).render(
  <StrictMode>
    <App />
    {/*<div className="min-h-screen bg-slate-50 p-6 text-slate-900">
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Журнал работ на строительном объекте
          </h1>
        </header>
        <main>
          <p className="text-sm text-slate-500">
            Инициализация систем завершена. Архитектурный каркас готов к разработке.
          </p>
        </main>
      </div>*/}
    {/*<WorkLogList />
    </App>*/}
  </StrictMode>,
);
