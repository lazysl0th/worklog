import React from 'react';

interface TableLoadingStateProps {
  message: string;
  columnCount?: number;
}

export function TableLoadingState({
  message,
  columnCount = 6,
}: TableLoadingStateProps): React.JSX.Element {
  return (
    <tr>
      <td
        colSpan={columnCount}
        className="flex items-center justify-center p-8 border border-ui-border-main rounded-ui-container bg-ui-bg-hover"
      >
        <span>{message}</span>
      </td>
    </tr>
  );
}
