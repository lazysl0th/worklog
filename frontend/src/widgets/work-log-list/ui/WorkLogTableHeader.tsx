import type { ReactNode } from 'react';

import { flexRender, type HeaderGroup } from '@tanstack/react-table';
import { ArrowDownUp, ArrowDown, ArrowUp } from 'lucide-react';

import type { TWorkLog } from '@/entities/work-log';

interface WorkLogTableHeaderProps {
  headerGroups: HeaderGroup<TWorkLog>[];
}

export function WorkLogTableHeader({ headerGroups }: WorkLogTableHeaderProps): ReactNode {
  return (
    <thead>
      {headerGroups.map((headerGroup) => {
        const gridTemplateColumns = headerGroup.headers
          .map((item) => {
            const id = item.id;

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
          <tr
            key={headerGroup.id}
            style={{ gridTemplateColumns }}
            className="grid items-center px-4 py-3 border-b border-ui-border-main bg-ui-bg-header gap-4"
          >
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="text-xs font-semibold uppercase tracking-wider opacity-60 overflow-hidden whitespace-nowrap"
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={`${header.column.getCanSort() && 'cursor-pointer select-none'} flex items-center justify-center gap-2`}
                    onClick={header.column.getToggleSortingHandler()}
                    title={
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === 'asc'
                          ? 'Сортировка по возрастанию'
                          : header.column.getNextSortingOrder() === 'desc'
                            ? 'Сортировка по убыванию'
                            : 'Нет сортировки'
                        : undefined
                    }
                  >
                    <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                    <span>
                      {header.column.getCanSort() &&
                        (header.column.getIsSorted() === 'asc' ? (
                          <ArrowUp size={17} />
                        ) : header.column.getIsSorted() === 'desc' ? (
                          <ArrowDown size={17} />
                        ) : (
                          <ArrowDownUp size={17} />
                        ))}
                    </span>
                  </div>
                )}
              </th>
            ))}
          </tr>
        );
      })}
    </thead>
  );
}
