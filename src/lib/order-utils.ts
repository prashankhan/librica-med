import type { CartItem } from "@/types/cart";
import { formatLkr } from "@/lib/format";

export function generateOrderId(): string {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LM-${t}-${r}`;
}

export function buildItemsSummary(items: CartItem[]): string {
  return items
    .map((item) => {
      const line = item.price_lkr * item.quantity;
      return `${item.title} × ${item.quantity} — ${formatLkr(line)}`;
    })
    .join("\n");
}
