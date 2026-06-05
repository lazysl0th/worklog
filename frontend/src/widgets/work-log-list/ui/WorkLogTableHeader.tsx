// Перешли на чистый тип ReactNode для синхронизации со всеми остальными компонентами
import type { ReactNode } from 'react';

import { flexRender, type HeaderGroup } from '@tanstack/react-table';

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
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        );
      })}
    </thead>
  );
}
