export const langs = ['en', 'es'] as const;
export type Lang = (typeof langs)[number];

export const getLang = (locale: string | undefined): Lang => (locale === 'es' ? 'es' : 'en');

// Home page path for each language
export const homePath: Record<Lang, string> = { en: '/', es: '/es/' };
