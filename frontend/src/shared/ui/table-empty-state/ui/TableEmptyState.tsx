import React from 'react';

interface TableEmptyStateProps {
  message: string;
  columnCount?: number;
}

export function TableEmptyState({
  message,
  columnCount = 6,
}: TableEmptyStateProps): React.JSX.Element {
  return (
    <tr>
      <td colSpan={columnCount} className="flex items-center justify-center p-8">
        <span>{message}</span>
      </td>
    </tr>
  );
}
