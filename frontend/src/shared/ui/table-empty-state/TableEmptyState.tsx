import React from 'react';

import { UI_THEME } from '../../config/theme';

interface TableEmptyStateProps {
  message: string;
}

export function TableEmptyState({ message }: TableEmptyStateProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-center p-8">
      <span className={UI_THEME.text.empty}>{message}</span>
    </div>
  );
}
