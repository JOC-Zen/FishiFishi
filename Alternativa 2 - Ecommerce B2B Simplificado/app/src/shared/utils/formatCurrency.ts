/**
 * Currency and number formatting utilities.
 * All functions are pure (no side effects).
 */

/**
 * Formats a number as currency (USD by default).
 * @param amount - Numeric amount to format.
 * @param currency - ISO currency code (default: "USD").
 * @param locale - Formatting locale (default: "en-US").
 * @returns Formatted string, e.g. "$1,234.56"
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a number with thousands separators.
 * @param value - Number to format.
 * @param locale - Formatting locale.
 * @returns Formatted string, e.g. "1,234"
 */
export function formatNumber(value: number, locale: string = "en-US"): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Calculates the discount percentage between two prices.
 * @param originalPrice - Original price.
 * @param discountedPrice - Price after discount.
 * @returns Rounded discount percentage.
 */
export function calculateDiscount(originalPrice: number, discountedPrice: number): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}
