import type { ChangeEvent } from 'react';

import { useTranslation } from 'react-i18next';

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
    <div className="flex items-center gap-4 p-2 bg-white rounded-lg shadow-sm ml-auto">
      <div className="flex items-center gap-2">
        <label htmlFor="startDate" className="text-sm font-medium text-slate-700">
          {t('filters.startDate', 'От:')}
        </label>
        <input
          id="startDate"
          type="date"
          value={filters.startDate ?? ''}
          onChange={handleStartChange}
          className="border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="endDate" className="text-sm font-medium text-slate-700">
          {t('filters.endDate', 'До:')}
        </label>
        <input
          id="endDate"
          type="date"
          value={filters.endDate ?? ''}
          onChange={handleEndChange}
          className="border border-slate-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {hasActiveFilters && (
        <button
          onClick={handleClear}
          type="button"
          className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
        >
          {t('filters.clear', 'Очистить')}
        </button>
      )}
    </div>
  );
};
