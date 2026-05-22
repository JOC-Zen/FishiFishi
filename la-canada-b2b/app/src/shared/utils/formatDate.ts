/**
 * Date formatting utilities.
 * All functions are pure (no side effects).
 */

/**
 * Formats a date in a human-readable format.
 * @param date - Date to format (Date, string, or number).
 * @param locale - Formatting locale (default: "en-US").
 * @returns Formatted string, e.g. "May 6, 2026"
 */
export function formatDate(
  date: Date | string | number,
  locale: string = "en-US"
): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Formats a date with time.
 * @param date - Date to format.
 * @param locale - Formatting locale.
 * @returns Formatted string, e.g. "May 6, 2026, 10:30 AM"
 */
export function formatDateTime(
  date: Date | string | number,
  locale: string = "en-US"
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
 * Returns a relative time string for how long ago a date occurred.
 * @param date - Reference date.
 * @returns Relative string, e.g. "3 days ago"
 */
export function timeAgo(date: Date | string | number): string {
  const now = Date.now();
  const past = new Date(date).getTime();
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatDate(date);
}
