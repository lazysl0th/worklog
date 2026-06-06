import type { ChangeEvent } from 'react';

import { CircleX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button, Input } from '@/shared/ui';

import { useWorkLogParams } from '../lib/useWorkLogSortFilter';

export const DateRangeFilter = () => {
  const { t } = useTranslation();
  const { filters, setDateFilter } = useWorkLogParams();

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateFilter(e.target.value, filters.endDate);
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateFilter(filters.startDate, e.target.value);
  };

  const handleClear = () => {
    setDateFilter(undefined, undefined);
  };

  const hasActiveFilters = Boolean(filters.startDate || filters.endDate);

  return (
    <div className="flex items-center gap-4 ml-auto flex-wrap justify-end">
      <Input
        type="date"
        id="startDate"
        value={filters.startDate ?? ''}
        onChange={handleStartChange}
        label={t('workLog.filter.startDate')}
        className="flex-row items-center"
      />

      <Input
        type="date"
        id="endDate"
        value={filters.endDate ?? ''}
        onChange={handleEndChange}
        label={t('workLog.filter.endDate')}
        className="flex-row items-center"
      />

      {hasActiveFilters && (
        <Button
          type="button"
          onClick={handleClear}
          variant="link"
          className="border-0 shadow-none! p-0!"
        >
          <CircleX
            size={16}
            className="text-red-600 dark:text-red-500 disabled:opacity-50 transition-colors"
          />
        </Button>
      )}
    </div>
  );
};
