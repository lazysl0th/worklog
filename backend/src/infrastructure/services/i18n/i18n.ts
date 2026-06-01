import i18next from 'i18next';

import ru from './locales/ru.json' with { type: 'json' };

export const resources = {
  ru: {
    translation: ru,
  },
} as const;

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
