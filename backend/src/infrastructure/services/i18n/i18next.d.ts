import 'i18next';
import type { resources } from './i18n.js';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['ru'];
  }
}
