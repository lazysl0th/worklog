import { type InputHTMLAttributes } from 'react';

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  rows?: number;
  error?: string;
}

export const Textarea = ({ label, error, className = '', ...props }: TextareaProps) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm self-start font-medium text-ui-text-heading">{label}</label>
    )}
    <textarea
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
