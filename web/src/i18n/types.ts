/** Estructura compartida por `landing.es.json` y `landing.en.json` */
export interface LandingDict {
  meta: {
    title: string;
    description: string;
  };
  header: {
    nav: {
      about: string;
      solutions: string;
      resources: string;
      blog: string;
    };
    joinSupport: string;
    ariaNav: string;
    ariaLang: string;
    themeAria: string;
    themeAuto: string;
    themeLight: string;
    themeDark: string;
  };
  hero: {
    eyebrow: string;
    heading: string;
    tags: string;
    cta: string;
    imageAlt: string;
    caption: string;
  };
  pillars: {
    title: string;
    items: Array<{ title: string; text: string }>;
  };
  soluciones: {
    title: string;
    items: Array<{ title: string; body: string }>;
  };
  recursos: {
    title: string;
    cards: Array<{
      label: string;
      href: string;
      variant: 'purpleYellow' | 'yellowPurple' | 'darkPink';
    }>;
  };
  blog: {
    title: string;
    titleNote: string;
    readArticle: string;
    empty: string;
  };
  footer: {
    tagline: string;
    contact: string;
    newsletterLink: string;
    instagram: string;
    linkedin: string;
    legal: string;
    privacy: string;
    terms: string;
    /** Plantilla con `{year}` */
    copyrightTpl: string;
    newsletterTitle: string;
    newsletterDesc: string;
    emailPlaceholder: string;
    subscribe: string;
    emailLabel: string;
  };
}

export type Locale = 'es' | 'en';
