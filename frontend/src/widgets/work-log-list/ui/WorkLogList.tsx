import {
  useReactTable,
  getCoreRowModel,
  type RowSelectionState,
  type ColumnDef,
} from '@tanstack/react-table';
import React, { useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetWorkLogsQuery, useWorkLogColumns, type TWorkLog } from '@/entities/work-log';
import { useGetWorkTypesQuery, WorkType, type TWorkType } from '@/entities/work-type';
import { TableLoadingState, TableEmptyState } from '@/shared';

import { TableCheckbox } from './TableCheckbox';
import { WorkLogTableHeader } from './WorkLogTableHeader';
import { WorkLogTableRow } from './WorkLogTableRow';
import { WorkLogToolbar } from './WorkLogToolbar';

export function WorkLogList(): React.JSX.Element {
  const { t } = useTranslation();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data: workLogs, isLoading: isLogsLoading } = useGetWorkLogsQuery();
  const { data: workTypes, isLoading: isTypesLoading } = useGetWorkTypesQuery();

  // Индексируем типы работ для быстрого поиска O(1)
  const workTypesMap = useMemo(() => {
    const map = new Map<string, TWorkType>();
    if (workTypes) workTypes.forEach((type) => map.set(type.id, type));
    return map;
  }, [workTypes]);

  const renderWorkType = useCallback(
    (workTypeId: string) => {
      const workType = workTypesMap.get(workTypeId);
      return <WorkType name={workType?.name || ''} />;
    },
    [workTypesMap],
  );

  const entityColumns = useWorkLogColumns({ renderWorkType });

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

  const stableTableData = useMemo(() => (workLogs ? [...workLogs] : []), [workLogs]);

  const table = useReactTable({
    data: stableTableData,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedIds = useMemo(() => {
    return Object.keys(rowSelection)
      .map((index) => stableTableData[Number(index)]?.id)
      .filter((id): id is string => Boolean(id));
  }, [rowSelection, stableTableData]);

  if (isLogsLoading || isTypesLoading) {
    return <TableLoadingState message={t('workLogList.loading')} />;
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <WorkLogToolbar selectedIds={selectedIds} onDeleteSuccess={() => setRowSelection({})} />

      <div className="w-full overflow-x-auto border border-ui-border-main bg-ui-bg-card shadow-xs">
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
