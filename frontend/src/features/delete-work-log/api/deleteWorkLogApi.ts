import { baseApi } from '@/shared/api';

import type { IDeleteResult, IDeleteWorkLogsDto } from '../model/types';

export const deleteWorkLogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    deleteWorkLogs: build.mutation<IDeleteResult, IDeleteWorkLogsDto>({
      query: ({ ids }) => ({
        url: 'work-logs',
        method: 'DELETE',
        body: { ids },
      }),
      invalidatesTags: ['WorkLog'],
    }),
  }),
});

export const { useDeleteWorkLogsMutation } = deleteWorkLogApi;
