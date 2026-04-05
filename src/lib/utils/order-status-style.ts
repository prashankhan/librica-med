/**
 * Tailwind classes for order status badges (track order UI).
 */
export function getOrderStatusStyle(status: string): string {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium";

  switch (status.toLowerCase()) {
    case "pending":
      return `${base} bg-blue-100 text-blue-700`;
    case "confirmed":
      return `${base} bg-indigo-100 text-indigo-700`;
    case "packed":
      return `${base} bg-amber-100 text-amber-700`;
    case "completed":
      return `${base} bg-green-100 text-green-700`;
    case "cancelled":
      return `${base} bg-red-100 text-red-700`;
    default:
      return `${base} bg-neutral-100 text-neutral-700`;
  }
}
