import { baseApi, providesList } from '@/shared';

import type { TWorkLog } from '../model/types';

export const workLogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkLogs: build.query<TWorkLog[], void>({
      query: () => '/work-logs',
      providesTags: (result) => providesList(result, 'WorkLog'),
    }),
  }),
});

export const { useGetWorkLogsQuery } = workLogApi;
