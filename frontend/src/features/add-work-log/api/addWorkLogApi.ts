import type { TWorkLog, TWorkLogCreateDto } from '@/entities/work-log';

import { baseApi } from '@/shared/api';

export const addWorkLogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addWorkLog: build.mutation<TWorkLog, TWorkLogCreateDto>({
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
