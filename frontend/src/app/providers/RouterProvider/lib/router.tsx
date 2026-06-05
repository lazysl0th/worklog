import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { MainLayout } from '../ui/MainLayout';
import { PageSkeleton } from '../ui/PageSkeleton';

const WorkLogsPageLazy = lazy(() =>
  import('@/pages/work-logs').then((module) => ({ default: module.WorkLogsPage })),
);

const WorkLogPageLazy = lazy(() =>
  import('@/pages/work-log').then((module) => ({ default: module.WorkLogPage })),
);

const CreateWorkLogPageLazy = lazy(() =>
  import('@/pages/work-log').then((module) => ({ default: module.CreateWorkLogPage })),
);

const ErrorPageLazy = lazy(() =>
  import('@/pages/error-page').then((module) => ({ default: module.ErrorPage })),
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: (
      <Suspense fallback={<PageSkeleton />}>
        <ErrorPageLazy />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/work-logs" replace />,
      },
      {
        path: 'work-logs',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <WorkLogsPageLazy />
              </Suspense>
            ),
          },
          {
            path: 'create',
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <CreateWorkLogPageLazy />
              </Suspense>
            ),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <WorkLogPageLazy />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
