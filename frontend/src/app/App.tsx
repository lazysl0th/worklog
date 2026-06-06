import { Toast } from '@/shared/ui';

import { AppRouter, I18nProvider, StoreProvider } from './providers';
import './styles/index.css';

export function App() {
  return (
    <StoreProvider>
      <I18nProvider>
        <AppRouter />
        <Toast />
      </I18nProvider>
    </StoreProvider>
  );
}
