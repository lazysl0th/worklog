import type { InputHTMLAttributes, ReactNode, Ref } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label?: string;
  readonly error?: string;
  readonly ref?: Ref<HTMLInputElement>;
}

export function Input({ label, error, className = '', ref, ...props }: InputProps): ReactNode {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium text-ui-text-heading">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
                    w-full px-3 py-2 border rounded-ui-control outline-none
                    bg-transparent transition-colors duration-200
                    text-ui-text-main placeholder:text-gray-400
                    ${
                      error
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-ui-border-main focus:border-ui-accent-solid'
                    }
                    ${className}
                `}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
