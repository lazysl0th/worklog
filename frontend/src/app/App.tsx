import { AppRouter, I18nProvider, StoreProvider } from './providers';
import './styles/index.css';

export function App() {
  return (
    <StoreProvider>
      <I18nProvider>
        <AppRouter />
      </I18nProvider>
    </StoreProvider>
  );
}
