import { type SelectHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = ({ label, options, error, className, ...props }: SelectProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1 ">
      {label && (
        <label className="text-sm self-start font-medium text-ui-text-heading">{label}</label>
      )}
      <select
        className={`
        w-full px-3 py-2 border rounded-ui-control outline-none
        text-ui-text-main transition-colors
        border-ui-border-main focus:border-ui-accent-solid
        ${
          error
            ? 'border-red-500! focus!border-red-500!'
            : 'border-ui-border-main focus:border-ui-accent-solid'
        }
        ${className}
      `}
        {...props}
        value={props.value ?? ''}
      >
        <option value="" disabled>
          {t('common.placeholders.select')}
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
};
