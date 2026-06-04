import { type ColumnDef } from '@tanstack/react-table';
import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import type { TWorkLog } from '../model/types';

interface UseWorkLogColumnsProps {
  renderWorkType: (workTypeId: string) => ReactNode;
}

export function useWorkLogColumns({
  renderWorkType,
}: UseWorkLogColumnsProps): ColumnDef<TWorkLog>[] {
  const { t } = useTranslation();

  return useMemo<ColumnDef<TWorkLog>[]>(
    () => [
      {
        accessorKey: 'date',
        header: () => t('workLog.columns.date', 'Дата'),
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
      },
      {
        id: 'workType',
        header: () => t('workLog.columns.workType', 'Тип работ'),
        cell: ({ row }) => renderWorkType(row.original.workTypeId),
      },
      {
        accessorKey: 'description',
        header: () => t('workLog.columns.title', 'Описание работ'),
        cell: ({ row }) => (
          <span
            className="font-medium text-gray-900 truncate"
            title={row.original.description || ''}
          >
            {row.original.description}
          </span>
        ),
      },
      {
        accessorKey: 'volume',
        header: () => t('workLog.columns.volume', 'Объем'),
        cell: ({ row }) => (
          <span className="font-mono text-right w-full">{row.original.volume}</span>
        ),
      },
      {
        accessorKey: 'unit',
        header: () => t('workLog.columns.unit', 'Ед. изм.'),
        cell: ({ row }) => <span className="text-gray-500">{row.original.unit}</span>,
      },
      {
        accessorKey: 'contractrorName',
        id: 'contractror',
        header: () => t('workLog.columns.executor', 'Исполнитель'),
        cell: ({ row }) => (
          <span className="text-sm text-gray-600 truncate" title={row.original.contractorId}>
            {row.original.contractorId}
          </span>
        ),
      },
    ],
    [renderWorkType, t],
  );
}
