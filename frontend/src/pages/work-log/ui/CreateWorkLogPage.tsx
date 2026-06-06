import type { ReactNode } from 'react';

import { AddWorkLogForm } from '@/features/add-work-log';

export function CreateWorkLogPage(): ReactNode {
  return (
    <div className="space-y-6">
      <AddWorkLogForm />
    </div>
  );
}
