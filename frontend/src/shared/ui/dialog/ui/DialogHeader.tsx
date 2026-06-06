import type { ReactNode } from 'react';

interface IDialogHeaderProps {
  className?: string;
  children: ReactNode;
}
export const DialogHeader = ({ className, ...props }: IDialogHeaderProps) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} />
);
