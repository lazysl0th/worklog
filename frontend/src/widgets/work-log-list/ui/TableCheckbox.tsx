import { useEffect, useRef, type ReactNode } from 'react';

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
  className = '',
}: TableCheckboxProps): ReactNode {
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
      className={`
        h-4 w-4 shrink-0 cursor-pointer rounded-sm border border-ui-border-main 
        bg-ui-bg-card text-ui-accent-solid accent-ui-accent-solid
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-accent-solid 
        transition-colors
        ${className}
      `.trim()}
    />
  );
}
