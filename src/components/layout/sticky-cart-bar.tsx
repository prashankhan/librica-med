"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { useShippingRules } from "@/hooks/use-shipping-rules";
import { formatLkr } from "@/lib/format";
import { getShippingFeeLkr, sumCartWeightGrams } from "@/lib/shipping";

export function StickyCartBar() {
  const pathname = usePathname();
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const rules = useShippingRules();
  const count = mounted ? items.reduce((n, i) => n + i.quantity, 0) : 0;
  const subtotal = mounted
    ? items.reduce((sum, i) => sum + i.price_lkr * i.quantity, 0)
    : 0;
  const totalWeight = mounted ? sumCartWeightGrams(items) : 0;
  const shipping = mounted ? getShippingFeeLkr(totalWeight, rules) : 0;
  const total = subtotal + shipping;

  const shouldHideStickyCart =
    pathname === "/cart" || pathname === "/checkout";

  if (!mounted || count === 0 || shouldHideStickyCart) return null;

  return (
    <>
      <Link
        href="/cart"
        className="fixed bottom-4 left-4 right-4 z-40 rounded-full bg-yellow-400 py-3 text-center text-sm font-bold text-black shadow-lg transition duration-200 ease-out hover:bg-yellow-300 md:hidden"
      >
        View cart ({count} {count === 1 ? "item" : "items"})
      </Link>

      <aside className="fixed bottom-4 right-4 z-40 hidden w-[320px] rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur md:block">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Cart summary
        </p>

        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex items-center justify-between text-gray-600">
            <dt>Products ({count})</dt>
            <dd className="font-medium text-[#001f40]">{formatLkr(subtotal)}</dd>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <dt>Shipping</dt>
            <dd className="font-medium text-[#001f40]">{formatLkr(shipping)}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-2 font-semibold text-[#001f40]">
            <dt>Total</dt>
            <dd>{formatLkr(total)}</dd>
          </div>
        </dl>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href="/cart"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-[#001f40] transition duration-200 ease-out hover:border-[#037eff]/40 hover:bg-[#037eff]/5"
          >
            View cart
          </Link>
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center rounded-full bg-[#037eff] px-3 py-2 text-sm font-semibold text-white transition duration-200 ease-out hover:brightness-110"
          >
            Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
