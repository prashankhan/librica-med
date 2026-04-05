const lkrFormatter = new Intl.NumberFormat("en-LK", {
  style: "currency",
  currency: "LKR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatLkr(amount: number): string {
  return lkrFormatter.format(Math.round(amount));
}

export function formatWeightGrams(grams: number): string {
  if (grams >= 1000) {
    const kg = grams / 1000;
    const rounded = Math.round(kg * 10) / 10;
    return `${rounded} kg`;
  }
  return `${grams} g`;
}
