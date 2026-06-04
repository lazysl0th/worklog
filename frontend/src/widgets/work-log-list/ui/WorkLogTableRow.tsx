import { flexRender, type Row } from '@tanstack/react-table';
import React from 'react';

import type { TWorkLog } from '@/entities/work-log';

import { cls } from '@/shared';

interface WorkLogTableRowProps {
  row: Row<TWorkLog>;
}

export function WorkLogTableRow({ row }: WorkLogTableRowProps): React.JSX.Element {
  const gridTemplateColumns = row
    .getVisibleCells()
    .map((cell) => {
      const id = cell.column.id;

      switch (id) {
        case 'select':
          return '48px';
        case 'date':
          return '120px';
        case 'unit':
          return '80px';
        case 'volume':
          return '100px';
        case 'title':
          return '2fr';
        case 'contractor':
          return '1.5fr';
        default:
          return '1fr';
      }
    })
    .join(' ');

  return (
    <div
      style={{ gridTemplateColumns }}
      className={cls(
        'px-4 py-3 transition-colors duration-150 gap-4 hover:bg-ui-bg-hover',
        row.getIsSelected() ? 'bg-ui-accent-bg hover:bg-ui-accent-hover' : '',
      )}
    >
      {row.getVisibleCells().map((cell) => (
        <div key={cell.id} className="flex w-full overflow-hidden">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ))}
    </div>
  );
}
