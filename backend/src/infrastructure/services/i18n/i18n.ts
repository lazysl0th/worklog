import i18next from 'i18next';

import { resources } from './locales/index.js';

i18next.init({
  lng: 'ru',
  resources,
  fallbackLng: 'ru',
  returnObjects: false,
});

export interface ITranslator {
  t: typeof i18next.t;
}

export const translator: ITranslator = {
  t: i18next.t,
};
