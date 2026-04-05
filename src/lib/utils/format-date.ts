/**
 * Day-first readable date/time in Asia/Colombo (e.g. "6 Apr 2026, 1:37 AM").
 */
export function formatReadableDate(dateString: string): string {
  if (!dateString?.trim()) return "Invalid date";

  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "Invalid date";

  try {
    const formatted = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Colombo",
    }).format(d);

    return formatted.replace(/\b(am|pm)\b/gi, (m) => m.toUpperCase());
  } catch {
    return "Invalid date";
  }
}
