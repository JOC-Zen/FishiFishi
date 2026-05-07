import { cookies, headers } from "next/headers";
import { Locale, getDictionary as loadDictionary } from "./getDictionary";

/**
 * Server-side helper to get the current dictionary based on detected locale.
 */
export async function getDictionary() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  
  const locale = (cookieStore.get("NEXT_LOCALE")?.value || 
                 headerStore.get("x-next-locale") || 
                 "en") as Locale;
  
  return {
    dict: await loadDictionary(locale),
    locale
  };
}
