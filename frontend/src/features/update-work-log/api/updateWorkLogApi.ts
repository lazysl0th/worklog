import type { TWorkLog, TWorkLogUpdateDto } from '@/entities/work-log';

import { baseApi } from '@/shared/api';

export const updateWorkLogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateWorkLog: build.mutation<TWorkLog, TWorkLogUpdateDto>({
      query: ({ id, ...body }) => ({
        url: `/work-logs/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'WorkLog', id }, 'WorkLog'],
    }),
  }),
});

export const { useUpdateWorkLogMutation } = updateWorkLogApi;
