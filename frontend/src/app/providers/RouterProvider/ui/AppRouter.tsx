import type { ReactNode } from 'react';

import { RouterProvider } from 'react-router-dom';

import { router } from '../lib/router';

export function AppRouter(): ReactNode {
  return <RouterProvider router={router} />;
}
