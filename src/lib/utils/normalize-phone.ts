/**
 * Normalizes Sri Lanka mobile numbers to +947XXXXXXXX (9 digits after +94).
 * Use the same helper for order create and track so Airtable queries match stored values.
 */
export function normalizePhone(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  let digits = trimmed.replace(/\D/g, "");

  if (digits.startsWith("94")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (digits.length === 9 && digits.startsWith("7")) {
    return `+94${digits}`;
  }

  return null;
}
