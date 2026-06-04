import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { env } from '../config/env';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: env.VITE_API_URL }),
  tagTypes: ['WorkLog', 'WorkType'],
  endpoints: () => ({}),
});
