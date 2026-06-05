import { Plus } from 'lucide-react';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/shared';

export function AddWorkLogsButton(): ReactNode | null {
  return (
    <Link to="/work-logs/create">
      <Button variant="link">
        <Plus className="size-5 text-green-600 dark:text-green-500" />
      </Button>
    </Link>
  );
}
