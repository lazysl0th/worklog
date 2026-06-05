import type { ReactNode } from 'react';

import { flexRender, type Row } from '@tanstack/react-table';

import type { TWorkLog } from '@/entities/work-log';
import { Link } from 'react-router-dom';

interface WorkLogTableRowProps {
  row: Row<TWorkLog>;
}

export function WorkLogTableRow({ row }: WorkLogTableRowProps): ReactNode {
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

  const isSelected = row.getIsSelected();

  return (
    <div
      style={{ gridTemplateColumns }}
      data-selected={isSelected}
      className="
        grid items-center 
        px-4 py-3 gap-4 
        transition-colors duration-150 
        bg-transparent hover:bg-ui-bg-hover
        data-[selected=true]:bg-ui-accent-bg 
        data-[selected=true]:hover:bg-ui-accent-hover
      "
    >
      {row.getVisibleCells().map((cell) => (
        <Link
          to={`/work-logs/${row.original.id}`}
          className="hover:text-blue-400 transition-colors font-medium cursor-pointer"
        >
          <div key={cell.id} className="flex overflow-hidden justify-center">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        </Link>
      ))}
    </div>
  );
}
