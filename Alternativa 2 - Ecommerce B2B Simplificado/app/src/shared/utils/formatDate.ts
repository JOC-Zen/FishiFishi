/**
 * Utilidades para formateo de fechas.
 * Todas las funciones son puras (sin efectos secundarios).
 */

/**
 * Formatea una fecha en formato legible.
 * @param date - Fecha a formatear (Date, string o number).
 * @param locale - Locale para el formato (default: "es-MX").
 * @returns String formateado, ej: "6 de mayo de 2026"
 */
export function formatDate(
  date: Date | string | number,
  locale: string = "es-MX"
): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Formatea una fecha con hora.
 * @param date - Fecha a formatear.
 * @param locale - Locale para el formato.
 * @returns String formateado, ej: "6 may 2026, 10:30 a.m."
 */
export function formatDateTime(
  date: Date | string | number,
  locale: string = "es-MX"
): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

/**
 * Devuelve hace cuánto tiempo ocurrió una fecha.
 * @param date - Fecha de referencia.
 * @returns String relativo, ej: "hace 3 días"
 */
export function timeAgo(date: Date | string | number): string {
  const now = Date.now();
  const past = new Date(date).getTime();
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "hace un momento";
  if (diffMin < 60) return `hace ${diffMin} min`;
  if (diffHour < 24) return `hace ${diffHour}h`;
  if (diffDay < 7) return `hace ${diffDay}d`;
  return formatDate(date);
}
