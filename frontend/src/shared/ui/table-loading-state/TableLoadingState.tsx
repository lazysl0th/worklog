import React from 'react';

interface TableLoadingStateProps {
  message: string;
}

export function TableLoadingState({ message }: TableLoadingStateProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-center p-8 border border-ui-border-main rounded-ui-container bg-ui-bg-hover">
      <span>{message}</span>
    </div>
  );
}
