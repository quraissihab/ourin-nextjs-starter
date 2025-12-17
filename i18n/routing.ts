import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'id'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // Don't show locale prefix for default locale
});

export type Locale = (typeof routing.locales)[number];
