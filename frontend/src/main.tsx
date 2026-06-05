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
  </StrictMode>,
);
