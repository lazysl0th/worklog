import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cls(...inputs: unknown[]): string {
  return twMerge(clsx(inputs));
}
