import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link';
}

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'bg-ui-text-heading text-ui-bg-main hover:bg-ui-text-main',
    secondary: 'bg-ui-bg-card border border-ui-border-main text-ui-text-main hover:bg-ui-bg-hover',
    link: 'items-center border border-ui-border-main bg-ui-bg-card text-ui-text-main hover:text-ui-text-heading hover:bg-ui-bg-hover shadow-sm',
  };

  return (
    <button
      className={`
        px-2 py-2 rounded-ui-control font-medium transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2 cursor-pointer
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
