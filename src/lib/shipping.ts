import type { ShippingRule } from "@/types/shipping";

/**
 * Total cart weight in grams (per line: weight × qty).
 */
export function sumCartWeightGrams(
  items: { weight_grams: number; quantity: number }[],
): number {
  return items.reduce((sum, line) => sum + line.weight_grams * line.quantity, 0);
}

/**
 * Pick the shipping bracket for a total weight. Rules should be non-overlapping
 * and sorted by min_weight ascending; top bracket may have max_weight_grams null.
 */
export function getShippingFeeLkr(
  totalWeightGrams: number,
  rules: ShippingRule[],
): number {
  if (rules.length === 0) return 0;

  const sorted = [...rules].sort((a, b) => a.min_weight_grams - b.min_weight_grams);

  for (const rule of sorted) {
    const minOk = totalWeightGrams >= rule.min_weight_grams;
    const maxOk =
      rule.max_weight_grams === null || totalWeightGrams <= rule.max_weight_grams;
    if (minOk && maxOk) return rule.price_lkr;
  }

  const fallback = sorted[sorted.length - 1];
  return fallback ? fallback.price_lkr : 0;
}
