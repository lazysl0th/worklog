import type { ReactNode } from 'react';

import { flexRender, type Row } from '@tanstack/react-table';

import type { TWorkLog } from '@/entities/work-log';

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
        /* 1. ИСПРАВЛЕНИЕ: Добавили grid и items-center для выравнивания с шапкой таблицы */
        grid items-center 
        px-4 py-3 gap-4 
        transition-colors duration-150 
        
        /* 2. СТИЛИ ПО УМОЛЧАНИЮ (строка не выбрана) */
        bg-transparent hover:bg-ui-bg-hover
        
        /* 3. МАГИЯ TAILWIND v4: Стили для выделенной строки через data-селектор */
        data-[selected=true]:bg-ui-accent-bg 
        data-[selected=true]:hover:bg-ui-accent-hover
      "
    >
      {row.getVisibleCells().map((cell) => (
        <div key={cell.id} className="flex overflow-hidden">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ))}
    </div>
  );
}
