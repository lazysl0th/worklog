import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  type Updater,
  type RowSelectionState,
} from '@tanstack/react-table';
import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useGetWorkLogsQuery, useWorkLogColumns, type TWorkLog } from '@/entities/work-log';
import { useWorkLogParams } from '@/features/filters-work-log';
import { TableLoadingState, TableEmptyState } from '@/shared';

import { getSelectedRows, setRowSelection } from '../model/slice';
import { TableCheckbox } from './TableCheckbox';
import { WorkLogTableHeader } from './WorkLogTableHeader';
import { WorkLogTableRow } from './WorkLogTableRow';
import { WorkLogToolbar } from './WorkLogToolbar';

export function WorkLogList(): ReactNode {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rowSelection = useSelector(getSelectedRows);
  const onRowSelectionChange = (updater: Updater<RowSelectionState>) => {
    const nextSelection = typeof updater === 'function' ? updater(rowSelection) : updater;

    dispatch(setRowSelection(nextSelection));
  };

  const { filters, sorting, handleSortingChange } = useWorkLogParams();

  const { data: workLogs = [], isLoading: isLogsLoading } = useGetWorkLogsQuery(
    sorting || filters
      ? {
          startDate: filters.startDate,
          endDate: filters.endDate,
          sortBy: sorting?.[0].id,
          sortDesc: sorting?.[0].desc ? 'true' : 'false',
        }
      : {},
  );

  const entityColumns = useWorkLogColumns();

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
    state: { rowSelection, sorting },
    onRowSelectionChange,
    getRowId: (row) => row.id,
    getCoreRowModel: useMemo(() => getCoreRowModel(), []),
    onSortingChange: handleSortingChange,
    enableSortingRemoval: true,
  });

  return (
    <div className="flex flex-col gap-4">
      <WorkLogToolbar />

      <div className="overflow-x-auto overflow-hidden rounded-ui-container border border-ui-border-main bg-ui-bg-card shadow-xs">
        <table className="flex flex-col min-w-250">
          <WorkLogTableHeader headerGroups={table.getHeaderGroups()} />

          <tbody className="flex flex-col divide-y divide-ui-border-light">
            {isLogsLoading ? (
              <TableLoadingState message={t('common.loading')} />
            ) : table.getRowModel().rows.length === 0 ? (
              <TableEmptyState message={t('workLog.list.empty')} />
            ) : (
              table
                .getRowModel()
                .rows.map((row) => (
                  <WorkLogTableRow key={row.id} row={row} isSelected={row.getIsSelected()} />
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
