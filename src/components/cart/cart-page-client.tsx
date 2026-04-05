"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { formatLkr, formatWeightGrams } from "@/lib/format";
import { getShippingFeeLkr, sumCartWeightGrams } from "@/lib/shipping";
import { useShippingRules } from "@/hooks/use-shipping-rules";
import { ButtonLink } from "@/components/ui/button";

export function CartPageClient() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const rules = useShippingRules();

  const subtotal = items.reduce(
    (s, i) => s + i.price_lkr * i.quantity,
    0,
  );
  const totalWeight = sumCartWeightGrams(items);
  const shipping = getShippingFeeLkr(totalWeight, rules);
  const grand = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/40 px-8 py-20 text-center">
        <p className="text-sm font-medium text-[#001f40]">Your cart is empty</p>
        <p className="mt-2 text-sm text-[#001f40]/60">
          Browse the shop and add titles you need for your programme.
        </p>
        <ButtonLink href="/shop" variant="primary" className="mt-8">
          Shop books
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
      <ul className="flex flex-col gap-4">
        {items.map((item) => {
          const line = item.price_lkr * item.quantity;
          return (
            <li
              key={item.id}
              className="flex gap-4 rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-sm"
            >
              <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg border border-neutral-100 bg-neutral-50">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[9px] text-center text-[#001f40]/40 px-1">
                    No cover
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/books/${item.slug}`}
                  className="text-sm font-semibold tracking-tight text-[#001f40] hover:text-[#037eff]"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-xs text-[#001f40]/55">
                  {formatWeightGrams(item.weight_grams)} each ·{" "}
                  {formatLkr(item.price_lkr)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-neutral-200">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="px-3 py-1.5 text-sm text-[#001f40] hover:bg-neutral-50 rounded-l-full"
                      onClick={() =>
                        setQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-medium tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="px-3 py-1.5 text-sm text-[#001f40] hover:bg-neutral-50 rounded-r-full"
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-medium text-red-600/90 hover:underline"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="text-sm font-semibold tabular-nums text-[#001f40]">
                {formatLkr(line)}
              </p>
            </li>
          );
        })}
      </ul>

      <aside className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm lg:sticky lg:top-24">
        <h2 className="text-sm font-semibold tracking-tight text-[#001f40]">
          Order summary
        </h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-4 text-[#001f40]/75">
            <dt>Subtotal</dt>
            <dd className="font-medium tabular-nums text-[#001f40]">
              {formatLkr(subtotal)}
            </dd>
          </div>
          <div className="flex justify-between gap-4 text-[#001f40]/75">
            <dt>Total weight</dt>
            <dd className="font-medium tabular-nums text-[#001f40]">
              {formatWeightGrams(totalWeight)}
            </dd>
          </div>
          <div className="flex justify-between gap-4 text-[#001f40]/75">
            <dt>Islandwide shipping</dt>
            <dd className="font-medium tabular-nums text-[#037eff]">
              {formatLkr(shipping)}
            </dd>
          </div>
          <div className="border-t border-neutral-100 pt-3 flex justify-between gap-4 text-[#001f40]">
            <dt className="font-semibold">Grand total</dt>
            <dd className="text-lg font-semibold tabular-nums tracking-tight">
              {formatLkr(grand)}
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-[#001f40]/50">
          Shipping is calculated from total weight. Rates apply islandwide.
        </p>
        <ButtonLink
          href="/checkout"
          variant="primary"
          className="mt-6 w-full justify-center"
        >
          Proceed to checkout
        </ButtonLink>
      </aside>
    </div>
  );
}
