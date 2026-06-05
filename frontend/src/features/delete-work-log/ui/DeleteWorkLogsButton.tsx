import { X } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/shared';
import { clearSelection, getSelectedRows } from '@/widgets/work-log-list/model/slice';

import { useDeleteWorkLogsMutation } from '../api/deleteWorkLogApi';

export function DeleteWorkLogsButton(): React.JSX.Element | null {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const rowSelection = useSelector(getSelectedRows);
  const selectedIds = Object.keys(rowSelection);

  const [deleteWorkLogs, { isLoading }] = useDeleteWorkLogsMutation();

  if (selectedIds.length === 0) {
    return null;
  }

  const handleDelete = async () => {
    if (!window.confirm(t('deleteWorkLogs.confirm', 'Точно удалить?'))) return;

    try {
      await deleteWorkLogs({ ids: selectedIds }).unwrap();
      dispatch(clearSelection());
    } catch (error) {
      console.error('Failed to delete work logs:', error);
    }
  };

  return (
    <Button variant="link" onClick={handleDelete} disabled={isLoading}>
      <X className="size-5 text-red-600 dark:text-red-500 rounded-ui-control disabled:opacity-50 transition-colors" />
    </Button>
  );
}
