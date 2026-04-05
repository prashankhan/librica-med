/**
 * Airtable integration uses a Personal Access Token (server-only).
 * Base: "librica-med-store" — set AIRTABLE_BASE_ID to that base’s id from the API URL.
 */
export function getAirtableConfig(): {
  token: string;
  baseId: string;
} | null {
  const token = process.env.AIRTABLE_PAT?.trim();
  const baseId = process.env.AIRTABLE_BASE_ID?.trim();
  if (!token || !baseId) return null;
  return { token, baseId };
}

export const AIRTABLE_TABLES = {
  books: process.env.AIRTABLE_TABLE_BOOKS?.trim() || "books",
  shipping_rules:
    process.env.AIRTABLE_TABLE_SHIPPING?.trim() || "shipping_rules",
  orders: process.env.AIRTABLE_TABLE_ORDERS?.trim() || "orders",
} as const;
