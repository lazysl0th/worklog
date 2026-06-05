import { baseApi, providesList } from '@/shared';

import type { TWorkType } from '../model/types';

export const workTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkTypes: build.query<TWorkType[], void>({
      query: () => '/work-types',
      providesTags: (result) => providesList(result, 'WorkType'),
    }),
  }),
});

export const { useGetWorkTypesQuery } = workTypeApi;
