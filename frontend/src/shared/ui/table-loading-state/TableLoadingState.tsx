import React from 'react';

import { UI_THEME } from '../../config/theme';

interface TableLoadingStateProps {
  message: string;
}

export function TableLoadingState({ message }: TableLoadingStateProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-center p-8 border border-ui-border-main rounded-ui-container bg-ui-bg-hover">
      <span className={UI_THEME.text.loading}>{message}</span>
    </div>
  );
}
