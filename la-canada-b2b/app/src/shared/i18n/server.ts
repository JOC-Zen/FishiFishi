import { cookies, headers } from "next/headers";
import { Locale, getDictionary as loadDictionary } from "./getDictionary";

/**
 * Server-side helper to get the current dictionary based on detected locale.
 */
export async function getDictionary() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  
  let locale = cookieStore.get("NEXT_LOCALE")?.value || 
               headerStore.get("x-next-locale");
               
  if (!locale) {
    // Detect from Accept-Language browser headers automatically
    const acceptLanguage = headerStore.get("accept-language") || "";
    if (acceptLanguage.toLowerCase().startsWith("es")) {
      locale = "es";
    } else {
      locale = "en";
    }
  }
  
  return {
    dict: await loadDictionary(locale as Locale),
    locale: locale as Locale
  };
}
