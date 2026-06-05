import { lazy } from 'react';

export const WorkLogsPageLazy = lazy(() =>
  import('@/pages/work-logs').then((module) => ({ default: module.WorkLogsPage })),
);

export const WorkLogPageLazy = lazy(() =>
  import('@/pages/work-log').then((module) => ({ default: module.WorkLogPage })),
);

export const CreateWorkLogPageLazy = lazy(() =>
  import('@/pages/work-log').then((module) => ({ default: module.CreateWorkLogPage })),
);

export const ErrorPageLazy = lazy(() =>
  import('@/pages/error-page').then((module) => ({ default: module.ErrorPage })),
);
