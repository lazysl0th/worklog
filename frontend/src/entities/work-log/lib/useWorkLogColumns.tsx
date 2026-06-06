import { type ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { TWorkLog } from '../model/types';

export function useWorkLogColumns(): ColumnDef<TWorkLog>[] {
  const { t } = useTranslation();

  return useMemo<ColumnDef<TWorkLog>[]>(
    () => [
      {
        accessorKey: 'date',
        header: () => t('workLog.list.columns.date'),
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
      },
      {
        id: 'workType',
        header: () => t('workLog.list.columns.workType'),
        cell: ({ row }) => <span className="font-mono text-right w-full">{row.original.workType.name}</span>,
        enableSorting: false,
      },
      {
        accessorKey: 'volume',
        header: () => t('workLog.list.columns.volume'),
        cell: ({ row }) => (
          <span className="font-mono text-right w-full">{row.original.volume}</span>
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'unit',
        header: () => t('workLog.list.columns.unit'),
        cell: ({ row }) => <span className="text-gray-500">{row.original.unit}</span>,
        enableSorting: false,
      },
      {
        accessorKey: 'contractrorName',
        id: 'contractror',
        header: () => t('workLog.list.columns.contractor'),
        cell: ({ row }) => <span>{row.original.contractor.fullName}</span>,
        enableSorting: false,
      },
    ],
    [t],
  );
}
