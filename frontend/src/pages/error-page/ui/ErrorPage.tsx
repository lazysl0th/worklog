import type { ReactNode } from 'react';

import { RotateCcw, TriangleAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (isObject(error) && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown runtime error';
}

export function ErrorPage(): ReactNode {
  const error = useRouteError();
  const { t } = useTranslation('error');

  const errorMessage = getErrorMessage(error);

  const handleReset = (): void => {
    window.location.assign('/');
  };

  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center gap-6 p-6 text-center"
      role="alert"
      aria-live="assertive"
    >
      <div className="animate-bounce rounded-full border border-red-500/20 bg-red-50 dark:bg-red-950/30 p-5 text-red-600 dark:text-red-400 select-none shadow-sm">
        <TriangleAlert size={64} strokeWidth={1.5} />
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-semibold text-ui-text-heading tracking-wide">
          {t('title', 'Что-то пошло не так')}
        </h3>
        <p className="text-sm">
          {t(
            'description',
            'Произошла критическая ошибка при работе с журналом работ. Наша инженерная команда уже уведомлена.',
          )}
        </p>
      </div>

      <div className="w-full max-w-md rounded-ui-container border border-ui-border-main bg-ui-border-light/30 p-4 font-mono text-xs text-red-600 dark:text-red-400 text-left overflow-x-auto break-words">
        <span className="text-gray-500 dark:text-gray-400 block mb-1 font-sans font-bold uppercase tracking-wider text-[10px]">
          {t('debugInfo', 'Служебная информация')}
        </span>
        {errorMessage}
      </div>

      <button
        onClick={handleReset}
        className="flex cursor-pointer items-center gap-2 rounded-ui-control bg-ui-accent-solid px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-98"
      >
        <RotateCcw size={16} />
        {t('actions.retry', 'Повторить попытку')}
      </button>
    </div>
  );
}
