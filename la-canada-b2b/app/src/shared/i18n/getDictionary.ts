const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};

/**
 * Guesses the locale based on common Spanish-speaking country codes.
 */
export const getLocaleFromCountry = (country: string): Locale => {
  const spanishSpeakingCountries = [
    "MX", "ES", "AR", "CO", "PE", "VE", "CL", "EC", "GT", "CU", 
    "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "PR"
  ];
  return spanishSpeakingCountries.includes(country.toUpperCase()) ? "es" : "en";
};
