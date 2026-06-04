import { type ReactNode } from 'react';

import { I18nProvider, StoreProvider } from './providers';
import './index.css';

type AppProps = {
  readonly children: ReactNode;
};

export function App({ children }: AppProps) {
  return (
    <StoreProvider>
      <I18nProvider>{children}</I18nProvider>
    </StoreProvider>
  );
}
