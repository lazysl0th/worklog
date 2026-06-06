import type { SortingState, Updater } from '@tanstack/react-table';

import { useSearchParams } from 'react-router-dom';

import { workLogFilterSortSchema } from '@/entities/work-log/model/schemas';

export const useWorkLogParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawParams = {
    startDate: searchParams.get('startDate') ?? undefined,
    endDate: searchParams.get('endDate') ?? undefined,
    sortBy: searchParams.get('sortBy') ?? undefined,
    sortDesc: searchParams.get('sortDesc') ?? undefined,
  };

  const parsed = workLogFilterSortSchema.safeParse(rawParams);
  const validParams = parsed.success ? parsed.data : {};

  const filters = {
    startDate: validParams.startDate,
    endDate: validParams.endDate,
  };

  const sorting: SortingState | undefined = validParams.sortBy
    ? [
        {
          id: validParams.sortBy,
          desc: validParams.sortDesc === 'true',
        },
      ]
    : undefined;

  const setDateFilter = (start?: string, end?: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (start) {
        newParams.set('startDate', start);
      } else {
        newParams.delete('startDate');
      }

      if (end) {
        newParams.set('endDate', end);
      } else {
        newParams.delete('endDate');
      }

      return newParams;
    });
  };

  const handleSortingChange = (updater: Updater<SortingState>) => {
    const newSorting: SortingState =
      typeof updater === 'function' ? updater(sorting ?? []) : updater;

    const firstSort = newSorting[0];

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (firstSort) {
        newParams.set('sortBy', firstSort.id);
        newParams.set('sortDesc', firstSort.desc ? 'true' : 'false');
      } else {
        newParams.delete('sortBy');
        newParams.delete('sortDesc');
      }

      return newParams;
    });
  };

  return {
    filters,
    sorting,
    setDateFilter,
    handleSortingChange,
  };
};
