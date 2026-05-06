/**
 * Utilidades para formateo de moneda y números.
 * Todas las funciones son puras (sin efectos secundarios).
 */

/**
 * Formatea un número como moneda (USD por defecto).
 * @param amount - Cantidad numérica a formatear.
 * @param currency - Código ISO de la moneda (default: "USD").
 * @param locale - Locale para el formato (default: "es-MX").
 * @returns String formateado, ej: "$1,234.56"
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "es-MX"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formatea un número con separadores de miles.
 * @param value - Número a formatear.
 * @param locale - Locale para el formato.
 * @returns String formateado, ej: "1,234"
 */
export function formatNumber(value: number, locale: string = "es-MX"): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * Calcula el porcentaje de descuento entre dos precios.
 * @param originalPrice - Precio original.
 * @param discountedPrice - Precio con descuento.
 * @returns Porcentaje de descuento redondeado.
 */
export function calculateDiscount(originalPrice: number, discountedPrice: number): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}
