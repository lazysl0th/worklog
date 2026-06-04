import { providesList } from '@/shared/api';
import { baseApi } from '@/shared/api/baseApi';

import { type TWorkType } from '../model/types';

export const workTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkTypes: build.query<readonly TWorkType[], void>({
      query: () => '/work-types',
      providesTags: (result) => providesList(result, 'WorkType'),
    }),
  }),
});

export const { useGetWorkTypesQuery } = workTypeApi;
