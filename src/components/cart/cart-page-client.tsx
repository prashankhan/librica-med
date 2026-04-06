"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { formatLkr, formatWeightGrams } from "@/lib/format";
import { getShippingFeeLkr, sumCartWeightGrams } from "@/lib/shipping";
import { useShippingRules } from "@/hooks/use-shipping-rules";
import { ButtonLink } from "@/components/ui/button";
import {
  PAGE_LEAD_CLASS,
  PAGE_PRIMARY_CTA_CLASS,
  PANEL_TITLE_CLASS,
} from "@/components/layout/page-container";

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
      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 px-8 py-20 text-center">
        <p className="text-base font-semibold text-[#001f40] md:text-lg">
          Your cart is empty
        </p>
        <p className={`mx-auto mt-3 max-w-md ${PAGE_LEAD_CLASS}`}>
          Browse the shop and add books you need for your programme.
        </p>
        <ButtonLink
          href="/shop"
          variant="primary"
          className={`mt-8 ${PAGE_PRIMARY_CTA_CLASS}`}
        >
          Shop books
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
      <ul className="flex flex-col gap-4 lg:col-span-2">
        {items.map((item) => {
          const line = item.price_lkr * item.quantity;
          return (
            <li
              key={item.id}
              className="flex gap-4 rounded-xl border border-gray-100 bg-white p-4 transition duration-200 ease-out hover:border-gray-200"
            >
              <div className="relative size-24 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50 md:size-28">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 96px, 112px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-1 text-center text-[9px] text-gray-400">
                    No cover
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/books/${item.slug}`}
                  className="text-base font-medium tracking-tight text-[#001f40] transition duration-200 ease-out hover:text-[#037eff] hover:underline md:text-lg"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-sm text-gray-500 md:text-base">
                  {formatWeightGrams(item.weight_grams)} each ·{" "}
                  <span className="font-semibold text-[#037eff]">
                    {formatLkr(item.price_lkr)}
                  </span>
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-gray-200">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      className="rounded-l-full px-3 py-2 text-sm text-[#001f40] transition duration-200 ease-out hover:bg-gray-50"
                      onClick={() =>
                        setQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center text-sm font-medium tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      className="rounded-r-full px-3 py-2 text-sm text-[#001f40] transition duration-200 ease-out hover:bg-gray-50"
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-red-600/90 transition duration-200 ease-out hover:underline"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="shrink-0 self-start text-base font-semibold tabular-nums text-[#001f40] md:text-lg">
                {formatLkr(line)}
              </p>
            </li>
          );
        })}
      </ul>

      <aside className="rounded-xl border border-gray-100 bg-gray-50/80 p-6 lg:sticky lg:top-[calc(90px+1rem)]">
        <h2 className={PANEL_TITLE_CLASS}>Order summary</h2>
        <dl className="mt-4 space-y-3 text-base">
          <div className="flex justify-between gap-4 text-gray-600">
            <dt>Subtotal</dt>
            <dd className="font-medium tabular-nums text-[#001f40]">
              {formatLkr(subtotal)}
            </dd>
          </div>
          <div className="flex justify-between gap-4 text-gray-600">
            <dt>Total weight</dt>
            <dd className="font-medium tabular-nums text-[#001f40]">
              {formatWeightGrams(totalWeight)}
            </dd>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between gap-4 text-gray-600">
              <dt>Islandwide shipping</dt>
              <dd className="font-semibold tabular-nums text-[#037eff]">
                {formatLkr(shipping)}
              </dd>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between gap-4 text-[#001f40]">
              <dt className="text-base font-semibold">Grand total</dt>
              <dd className="text-lg font-semibold tabular-nums tracking-tight">
                {formatLkr(grand)}
              </dd>
            </div>
          </div>
        </dl>
        <p className="mt-4 text-sm leading-relaxed text-gray-500 md:text-base">
          Shipping is calculated from total weight. Rates apply islandwide.
        </p>
        <ButtonLink
          href="/checkout"
          variant="primary"
          className={`mt-6 w-full justify-center ${PAGE_PRIMARY_CTA_CLASS}`}
        >
          Proceed to checkout
        </ButtonLink>
      </aside>
    </div>
  );
}
