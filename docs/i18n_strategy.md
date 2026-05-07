# Implementation Plan: IP-Based Multilingual Support

Goal: Automatically switch between English and Spanish based on the user's IP/location, while maintaining a manual override.

## 1. Dictionary System
- Create `src/shared/i18n/dictionaries/en.json`
- Create `src/shared/i18n/dictionaries/es.json`
- Extract all UI strings from pages and components into these files.

## 2. i18n Logic
- Create `src/shared/i18n/getDictionary.ts` to load the appropriate JSON file.
- Create a `useTranslation` hook (for client components).
- Create a `T` (Translate) helper for server components.

## 3. Language Detection (Middleware)
- Update `src/middleware.ts` to:
    1. Check for a `lang` cookie.
    2. If missing, use a GeoIP API (like `ipapi.co` or `freeipapi.com`) or Netlify's `x-nf-geo` headers to detect the country.
    3. Default to `es` for Spanish-speaking countries (MX, ES, AR, etc.) and `en` otherwise.
    4. Set the `NEXT_LOCALE` cookie.
    5. Pass the locale to the request headers.

## 4. UI Updates
- Add a language switcher in the `TopBar` or `Sidebar`.
- Update all pages to use the translation helpers instead of hardcoded strings.

## 5. Deployment Considerations
- Ensure Netlify environment variables are configured if using a specific GeoIP provider.
- Use Netlify Edge Functions for faster detection if possible.

## Execution Steps
1. **Batch 1**: Setup directories and dictionary files (English base + Spanish from previous versions).
2. **Batch 2**: Implementation of `getDictionary` and middleware logic.
3. **Batch 3**: Refactor Shared Components (`TopBar`, `Sidebar`).
4. **Batch 4**: Refactor Dashboard pages.
5. **Batch 5**: Refactor Portal pages.
6. **Batch 6**: Add manual language switcher.
