import type { SelectHTMLAttributes, ReactNode, Ref } from 'react';

import { useTranslation } from 'react-i18next';

interface SelectOption {
  readonly label: string;
  readonly value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  readonly label?: string;
  readonly options: ReadonlyArray<SelectOption>;
  readonly error?: string;
  readonly ref?: Ref<HTMLSelectElement>;
}

export function Select({
  label,
  options,
  error,
  className = '',
  ref,
  ...props
}: SelectProps): ReactNode {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm self-start font-medium text-ui-text-heading">{label}</label>
      )}
      <select
        defaultValue=""
        ref={ref}
        className={`
                    w-full px-3 py-2 border rounded-ui-control outline-none
                    text-ui-text-main transition-colors
                    ${
                      error
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-ui-border-main focus:border-ui-accent-solid'
                    }
                    ${className}
                `}
        {...props}
      >
        <option value="" disabled>
          {t('common.placeholders.select', 'Выберите значение')}
        </option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
