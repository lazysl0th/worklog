import { type ColumnDef } from '@tanstack/react-table';
import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import type { TWorkLog } from '../model/types';

interface UseWorkLogColumnsProps {
  renderWorkType: (workTypeName: string) => ReactNode;
  renderContractor: (contractorFullName: string) => ReactNode;
}

export function useWorkLogColumns({
  renderWorkType,
  renderContractor,
}: UseWorkLogColumnsProps): ColumnDef<TWorkLog>[] {
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
        cell: ({ row }) => renderWorkType(row.original.workType.name),
      },
      /*{
        accessorKey: 'description',
        header: () => t('workLog.list.columns.description'),
        cell: ({ row }) => (
          <span
            className="font-medium text-gray-900 truncate"
            title={row.original.description || ''}
          >
            {row.original.description}
          </span>
        ),
      },*/
      {
        accessorKey: 'volume',
        header: () => t('workLog.list.columns.volume'),
        cell: ({ row }) => (
          <span className="font-mono text-right w-full">{row.original.volume}</span>
        ),
      },
      {
        accessorKey: 'unit',
        header: () => t('workLog.list.columns.unit'),
        cell: ({ row }) => <span className="text-gray-500">{row.original.unit}</span>,
      },
      {
        accessorKey: 'contractrorName',
        id: 'contractror',
        header: () => t('workLog.list.columns.contractor'),
        cell: ({ row }) => renderContractor(row.original.contractor.fullName),
      },
    ],
    [renderWorkType, renderContractor, t],
  );
}
