import { baseApi, providesList } from '@/shared';

import type { TWorkLog } from '../model/types';

export type CreateWorkLogDto = Readonly<Omit<TWorkLog, 'id' | 'createdAt' | 'updatedAt'>>;

export const workLogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkLogs: build.query<TWorkLog[], void>({
      query: () => '/work-logs',
      providesTags: (result) => providesList(result, 'WorkLog'),
    }),

    createWorkLog: build.mutation<TWorkLog, CreateWorkLogDto>({
      query: (body) => ({
        url: '/work-logs',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'WorkLog', id: 'LIST' }],
    }),
  }),
});

export const { useGetWorkLogsQuery, useCreateWorkLogMutation } = workLogApi;
