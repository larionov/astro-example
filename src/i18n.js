import Polyglot from 'node-polyglot';

export const langPathRegex = /\/([a-z]{2}-?[A-Z]{0,2})\//;
export const DEFAULT_LOCALE = 'en';
export const KNOWN_LANGUAGES = ['en', 'ua', 'ru'];

export const i18n = new Polyglot({
  allowMissing: true,
  onMissingKey: (key) => {
    return key;
  },
});

export const getLocales = async (imports) => {
  const translations = Object.entries(imports).reduce(
    (acc, [path, contents]) => {
      acc[getLanguageFromURL(path)] = contents();
      return acc;
    },
    {},
  );

  const translationsResolved = await Promise.all(
    KNOWN_LANGUAGES.map((locale) => translations[locale]),
  );
  return KNOWN_LANGUAGES.reduce((acc, locale) => {
    acc[locale] = translationsResolved[KNOWN_LANGUAGES.indexOf(locale)];
    return acc;
  }, {});
};

export function getLanguageFromURL(pathname) {
  const langCodeMatch = pathname.match(langPathRegex);
  return langCodeMatch ? langCodeMatch[1] : DEFAULT_LOCALE;
}
