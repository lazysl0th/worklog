export const UI_THEME = {
  container: {
    wrapper: 'flex flex-col w-full border-ui-border-main bg-ui-bg-card shadow-xs overflow-hidden',
    toolbar:
      'flex items-center justify-between bg-ui-bg-hover p-4 border border-ui-border-main gap-4',
    header: 'border-b border-ui-border-main bg-ui-bg-header px-4 py-3',
    bodyDivider: 'flex flex-col divide-y divide-ui-border-light',
    row: 'px-4 py-3 transition-colors duration-150 ease-in-out hover:bg-ui-bg-hover',
    rowSelected: 'bg-ui-accent-bg hover:bg-ui-accent-hover',
  },

  control: {
    checkbox:
      'h-4 w-4 rounded-ui-control border-gray-300 text-ui-accent-solid focus:ring-blue-500 cursor-pointer transition-colors',
  },

  text: {
    tableHeader: 'text-xs font-semibold uppercase tracking-wider text-gray-500',
    loading: 'text-sm font-medium text-gray-500 animate-pulse',
    error: 'text-sm font-medium text-red-600',
    empty: 'text-sm text-gray-400',
  },
} as const;
