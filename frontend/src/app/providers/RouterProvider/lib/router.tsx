import { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { MainLayout } from '../ui/MainLayout';
import { PageSkeleton } from '../ui/PageSkeleton';
import { CreateWorkLogPageLazy, ErrorPageLazy, WorkLogPageLazy, WorkLogsPageLazy } from './lazy';

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
