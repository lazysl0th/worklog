import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '@/shared';
import { workLogListSlice } from '@/widgets/work-log-list';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [workLogListSlice.reducerPath]: workLogListSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
