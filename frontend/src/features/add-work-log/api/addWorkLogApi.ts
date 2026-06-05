import type { TWorkLog } from '@/entities/work-log';

import { baseApi } from '@/shared/api';

import type { TCreateWorkLogDto } from '../model/types';

export const addWorkLogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addWorkLog: build.mutation<TWorkLog, TCreateWorkLogDto>({
      query: (body) => ({
        url: '/work-logs',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'WorkLog', id: 'LIST' }],
    }),
  }),
});

export const { useAddWorkLogMutation } = addWorkLogApi;
