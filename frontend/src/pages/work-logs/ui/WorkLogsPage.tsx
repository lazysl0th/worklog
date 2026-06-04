import type { ReactNode } from 'react';

import { WorkLogList } from '@/widgets';

export function WorkLogsPage(): ReactNode {
  return (
    <div className="space-y-6">
      <WorkLogList />
    </div>
  );
}
