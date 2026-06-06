import { X } from 'lucide-react';
import { useState, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, toast } from '@/shared/ui';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/ui';
import { clearSelection, getSelectedRows } from '@/widgets/work-log-list';

import { useDeleteWorkLogsMutation } from '../api/deleteWorkLogApi';

export function DeleteWorkLogsButton(): JSX.Element | null {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const rowSelection = useSelector(getSelectedRows);
  const selectedIds = Object.keys(rowSelection);

  const [deleteWorkLogs] = useDeleteWorkLogsMutation();

  if (selectedIds.length === 0) {
    return null;
  }

  const handleDelete = async () => {
    try {
      const result = await deleteWorkLogs({ ids: selectedIds }).unwrap();
      dispatch(clearSelection());
      toast.success(t('workLog.notifications.deleteSuccess', { count: result.count }));
    } catch (e) {
      console.error(e);
      toast.error(t('workLog.notifications.deleteError'));
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link">
          <X
            size={16}
            className=" text-red-600 dark:text-red-500 rounded-ui-control disabled:opacity-50 transition-colors"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-ui-bg-card border border-ui-border-main rounded-ui-container p-6 shadow-xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-medium text-ui-text-heading">
            {t('workLog.dialog.delete.title')}
          </DialogTitle>
          <DialogDescription className="text-ui-text-main">
            {t('workLog.dialog.delete.subtitle')}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            {t('workLog.dialog.delete.cancel')}
          </Button>
          <Button variant="link" onClick={handleDelete}>
            {t('workLog.dialog.delete.confirm')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
