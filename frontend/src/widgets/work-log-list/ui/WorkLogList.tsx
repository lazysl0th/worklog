import {
  useReactTable,
  getCoreRowModel,
  type RowSelectionState,
  type ColumnDef,
} from '@tanstack/react-table';
import { useMemo, useState, useCallback, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Contractor } from '@/entities/contractor';
import { useGetWorkLogsQuery, useWorkLogColumns, type TWorkLog } from '@/entities/work-log';
import { WorkType } from '@/entities/work-type';
import { TableLoadingState, TableEmptyState } from '@/shared';

import { TableCheckbox } from './TableCheckbox';
import { WorkLogTableHeader } from './WorkLogTableHeader';
import { WorkLogTableRow } from './WorkLogTableRow';
import { WorkLogToolbar } from './WorkLogToolbar';

export function WorkLogList(): ReactNode {
  const { t } = useTranslation();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data: workLogs = [], isLoading: isLogsLoading } = useGetWorkLogsQuery();

  const renderWorkType = useCallback((workTypeName: string) => {
    return <WorkType name={workTypeName} />;
  }, []);

  const renderContractor = useCallback((contractorFullName: string) => {
    return <Contractor name={contractorFullName} />;
  }, []);

  const entityColumns = useWorkLogColumns({ renderWorkType, renderContractor });

  const columns = useMemo<ColumnDef<TWorkLog>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <TableCheckbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            ariaLabel={t('workLogList.aria.selectAll')}
          />
        ),
        cell: ({ row }) => (
          <TableCheckbox
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
            ariaLabel={t('workLogList.aria.selectRow')}
          />
        ),
      },
      ...entityColumns,
    ],
    [entityColumns, t],
  );

  const table = useReactTable({
    data: workLogs,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedIds = useMemo(() => {
    return Object.keys(rowSelection)
      .map((index) => workLogs[Number(index)]?.id)
      .filter((id): id is string => Boolean(id));
  }, [rowSelection, workLogs]);

  if (isLogsLoading) {
    return <TableLoadingState message={t('workLogList.loading')} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <WorkLogToolbar selectedIds={selectedIds} onDeleteSuccess={() => setRowSelection({})} />

      <div className="overflow-x-auto overflow-hidden rounded-ui-container border border-ui-border-main bg-ui-bg-card shadow-xs">
        <div className="flex flex-col min-w-250">
          <WorkLogTableHeader headerGroups={table.getHeaderGroups()} />

          <div className="flex flex-col divide-y divide-ui-border-light">
            {table.getRowModel().rows.map((row) => (
              <WorkLogTableRow key={row.id} row={row} />
            ))}

            {table.getRowModel().rows.length === 0 && (
              <TableEmptyState message={t('workLogList.empty')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
