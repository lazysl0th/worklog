import { Toaster } from 'sonner';

export const Toast = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-lg font-sans',
        classNames: {
          error: 'bg-red-50 text-red-600 border-red-200',
          success: 'bg-green-50 text-green-600 border-green-200',
          warning: 'bg-amber-50 text-amber-600 border-amber-200',
          info: 'bg-blue-50 text-blue-600 border-blue-200',
        },
      }}
    />
  );
};
