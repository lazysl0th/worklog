import { baseApi, providesList } from '@/shared';

import type { TWorkLog, TWorkTypeUnit } from '../model/types';

export const workLogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkLogs: build.query<TWorkLog[], void>({
      query: () => '/work-logs',
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
