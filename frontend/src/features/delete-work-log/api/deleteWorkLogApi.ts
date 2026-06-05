import { baseApi } from '@/shared/api';

export const deleteWorkLogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    deleteWorkLogs: build.mutation<{ count: number }, { ids: string[] }>({
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
