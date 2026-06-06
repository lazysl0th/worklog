import { baseApi, providesList } from '@/shared';

import type { TWorkLog, TWorkLogFilterSortDto, TWorkTypeUnit } from '../model/types';

export const workLogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkLogs: build.query<TWorkLog[], TWorkLogFilterSortDto>({
      query: ({ startDate, endDate, sortBy, sortDesc }) => ({
        url: '/work-logs',
        params: { startDate, endDate, sortBy, sortDesc },
      }),
      providesTags: (result) => providesList(result, 'WorkLog'),
    }),
    getWorkLog: build.query<TWorkLog, TWorkLog['id']>({
      query: (id) => `/work-logs/${id}`,
      providesTags: (_, __, id) => [{ type: 'WorkLog', id }],
    }),
    getUnits: build.query<TWorkTypeUnit[], void>({
      query: () => 'work-logs/units',
    }),
  }),
});

export const { useGetWorkLogsQuery, useGetWorkLogQuery, useGetUnitsQuery } = workLogApi;
