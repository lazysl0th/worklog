import { useEffect, useRef } from 'react';

import { cls } from '@/shared';
import { UI_THEME } from '@/shared/config';

interface TableCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ariaLabel?: string;
  className?: string;
}

export function TableCheckbox({
  checked,
  indeterminate,
  onChange,
  ariaLabel,
  className,
}: TableCheckboxProps): React.JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel}
      className={cls(UI_THEME.control.checkbox, className)}
    />
  );
}
