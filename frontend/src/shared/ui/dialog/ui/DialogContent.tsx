import type { ReactNode } from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

interface IDialogContentProps {
  className?: string;
  children: ReactNode;
}

export const DialogContent = ({ className, children, ...props }: IDialogContentProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
    <DialogPrimitive.Content
      className={`
        fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] p-6 rounded-lg shadow-lg
        ${className}
      `}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);
