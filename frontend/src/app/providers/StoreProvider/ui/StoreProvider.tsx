import { type ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '../store';

interface StoreProviderProps {
  readonly children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps): ReactNode {
  return <Provider store={store}>{children}</Provider>;
}
