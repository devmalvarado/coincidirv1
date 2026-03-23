import type { Locale } from './types';

export const HOME_PATHS: Record<Locale, string> = {
  es: '/home',
  en: '/en/home',
};

export function homePath(locale: Locale): string {
  return HOME_PATHS[locale];
}
