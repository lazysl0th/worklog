import { flexRender, type HeaderGroup } from '@tanstack/react-table';
import React from 'react';

import type { TWorkLog } from '@/entities/work-log';

interface WorkLogTableHeaderProps {
  headerGroups: HeaderGroup<TWorkLog>[];
}

export function WorkLogTableHeader({ headerGroups }: WorkLogTableHeaderProps): React.JSX.Element {
  return (
    <>
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
          <div
            key={headerGroup.id}
            style={{ gridTemplateColumns }}
            className="grid place-items-center px-4 py-3 border-b border-ui-border-main bg-ui-bg-header gap-4"
          >
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                className="text-xs font-semibold uppercase tracking-wider text-gray-500 overflow-hidden whitespace-nowrap"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}
