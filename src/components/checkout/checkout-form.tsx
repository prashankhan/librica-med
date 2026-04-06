"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { formatLkr, formatWeightGrams } from "@/lib/format";
import { getShippingFeeLkr, sumCartWeightGrams } from "@/lib/shipping";
import { useShippingRules } from "@/hooks/use-shipping-rules";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  PAGE_FIELD_LABEL_CLASS,
  PAGE_PRIMARY_CTA_CLASS,
  PANEL_TITLE_CLASS,
} from "@/components/layout/page-container";

export interface OrderPlacedDetails {
  orderId: string;
  whatsappUrl: string;
}

interface CheckoutFormProps {
  onOrderPlaced?: (details: OrderPlacedDetails) => void;
}

export function CheckoutForm({ onOrderPlaced }: CheckoutFormProps) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const rules = useShippingRules();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = items.reduce(
    (s, i) => s + i.price_lkr * i.quantity,
    0,
  );
  const totalWeight = sumCartWeightGrams(items);
  const shipping = getShippingFeeLkr(totalWeight, rules);
  const grand = subtotal + shipping;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          phone_number: phone,
          delivery_address: address,
          items: items.map((i) => ({
            id: i.id,
            title: i.title,
            slug: i.slug,
            price_lkr: i.price_lkr,
            weight_grams: i.weight_grams,
            image: i.image,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Could not place order. Please try again.",
        );
        setSubmitting(false);
        return;
      }
      const orderId =
        typeof data.order_id === "string" ? data.order_id : null;
      const whatsappUrl =
        typeof data.whatsapp_url === "string" ? data.whatsapp_url : null;
      if (!orderId || !whatsappUrl) {
        setError("Unexpected response from server. Please contact us.");
        setSubmitting(false);
        return;
      }
      clear();
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      onOrderPlaced?.({ orderId, whatsappUrl });
      setSubmitting(false);
    } catch {
      setError("Network error. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 px-8 py-16 text-center">
        <p className="text-base font-medium text-gray-600 md:text-lg">
          Nothing to checkout yet.
        </p>
        <ButtonLink
          href="/shop"
          variant="primary"
          className={`mt-6 ${PAGE_PRIMARY_CTA_CLASS}`}
        >
          Continue shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 lg:grid-cols-3 lg:items-start"
    >
      <div className="space-y-6 lg:col-span-2">
        <div>
          <label htmlFor="customer_name" className={PAGE_FIELD_LABEL_CLASS}>
            Full name
          </label>
          <input
            id="customer_name"
            name="customer_name"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#001f40] transition duration-200 ease-out focus:border-[#037eff] focus:outline-none focus:ring-2 focus:ring-[#037eff]/20"
          />
        </div>
        <div>
          <label htmlFor="phone_number" className={PAGE_FIELD_LABEL_CLASS}>
            Phone number
          </label>
          <input
            id="phone_number"
            name="phone_number"
            required
            minLength={8}
            maxLength={32}
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#001f40] transition duration-200 ease-out focus:border-[#037eff] focus:outline-none focus:ring-2 focus:ring-[#037eff]/20"
          />
        </div>
        <div>
          <label htmlFor="delivery_address" className={PAGE_FIELD_LABEL_CLASS}>
            Delivery address
          </label>
          <textarea
            id="delivery_address"
            name="delivery_address"
            required
            minLength={10}
            maxLength={2000}
            rows={4}
            autoComplete="street-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full resize-y rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#001f40] transition duration-200 ease-out focus:border-[#037eff] focus:outline-none focus:ring-2 focus:ring-[#037eff]/20"
          />
        </div>
        {error ? (
          <p
            className="text-sm leading-relaxed text-red-600"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        <p className="text-sm leading-relaxed text-gray-500 md:text-base">
          By placing this order you confirm your details are correct. We will
          reach out via WhatsApp to confirm availability and payment
          arrangements. No card payment is taken on this website.
        </p>
        <p className="text-sm text-gray-500 md:text-base">
          Orders are confirmed instantly via WhatsApp after submission.
        </p>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            className={`w-full justify-center sm:min-w-0 sm:flex-1 ${PAGE_PRIMARY_CTA_CLASS}`}
          >
            {submitting ? "Saving order…" : "Place order & open WhatsApp"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className={`w-full shrink-0 justify-center sm:w-auto ${PAGE_PRIMARY_CTA_CLASS}`}
            onClick={() => router.push("/cart")}
          >
            Back to cart
          </Button>
        </div>
      </div>

      <aside className="rounded-xl border border-gray-100 bg-gray-50/80 p-6 lg:sticky lg:top-[calc(90px+1rem)]">
        <h2 className={PANEL_TITLE_CLASS}>Order summary</h2>
        <ul className="mt-4 space-y-2 text-base text-gray-600">
          {items.map((i) => (
            <li key={i.id} className="flex justify-between gap-4">
              <span className="line-clamp-2">
                {i.title}{" "}
                <span className="text-gray-400">×{i.quantity}</span>
              </span>
              <span className="shrink-0 tabular-nums font-medium text-[#001f40]">
                {formatLkr(i.price_lkr * i.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t border-gray-200 pt-4 text-base">
          <div className="flex justify-between text-gray-600">
            <dt>Books subtotal</dt>
            <dd className="tabular-nums font-medium text-[#001f40]">
              {formatLkr(subtotal)}
            </dd>
          </div>
          <div className="flex justify-between text-gray-600">
            <dt>Total weight</dt>
            <dd className="tabular-nums font-medium text-[#001f40]">
              {formatWeightGrams(totalWeight)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 text-gray-600">
            <dt>Shipping</dt>
            <dd className="tabular-nums font-semibold text-[#037eff]">
              {formatLkr(shipping)}
            </dd>
          </div>
          <div className="flex justify-between pt-2 text-base font-semibold text-[#001f40]">
            <dt>Grand total</dt>
            <dd className="tabular-nums tracking-tight">{formatLkr(grand)}</dd>
          </div>
        </dl>
      </aside>
    </form>
  );
}
