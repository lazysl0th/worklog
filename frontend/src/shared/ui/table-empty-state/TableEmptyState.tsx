import React from 'react';

interface TableEmptyStateProps {
  message: string;
}

export function TableEmptyState({ message }: TableEmptyStateProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-center p-8">
      <span>{message}</span>
    </div>
  );
}
