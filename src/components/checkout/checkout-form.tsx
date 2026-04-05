"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { formatLkr, formatWeightGrams } from "@/lib/format";
import { getShippingFeeLkr, sumCartWeightGrams } from "@/lib/shipping";
import { useShippingRules } from "@/hooks/use-shipping-rules";
import { Button, ButtonLink } from "@/components/ui/button";

export function CheckoutForm() {
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
      clear();
      window.location.href = data.whatsapp_url as string;
    } catch {
      setError("Network error. Check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/40 px-8 py-16 text-center">
        <p className="text-sm text-[#001f40]/70">Nothing to checkout yet.</p>
        <ButtonLink href="/shop" variant="primary" className="mt-6">
          Continue shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start"
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="customer_name"
            className="block text-xs font-semibold uppercase tracking-wider text-[#001f40]/55"
          >
            Full name
          </label>
          <input
            id="customer_name"
            name="customer_name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-[#001f40] focus:border-[#037eff] focus:outline-none focus:ring-2 focus:ring-[#037eff]/20"
          />
        </div>
        <div>
          <label
            htmlFor="phone_number"
            className="block text-xs font-semibold uppercase tracking-wider text-[#001f40]/55"
          >
            Phone number
          </label>
          <input
            id="phone_number"
            name="phone_number"
            required
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-[#001f40] focus:border-[#037eff] focus:outline-none focus:ring-2 focus:ring-[#037eff]/20"
          />
        </div>
        <div>
          <label
            htmlFor="delivery_address"
            className="block text-xs font-semibold uppercase tracking-wider text-[#001f40]/55"
          >
            Delivery address
          </label>
          <textarea
            id="delivery_address"
            name="delivery_address"
            required
            rows={4}
            autoComplete="street-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 w-full resize-y rounded-2xl border border-neutral-200 px-4 py-3 text-sm text-[#001f40] focus:border-[#037eff] focus:outline-none focus:ring-2 focus:ring-[#037eff]/20"
          />
        </div>
        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <p className="text-xs leading-relaxed text-[#001f40]/50">
          By placing this order you confirm your details are correct. We will
          reach out via WhatsApp to confirm availability and payment
          arrangements. No card payment is taken on this website.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            className="min-w-[200px] justify-center"
          >
            {submitting ? "Saving order…" : "Place order & open WhatsApp"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="justify-center"
            onClick={() => router.push("/cart")}
          >
            Back to cart
          </Button>
        </div>
      </div>

      <aside className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold tracking-tight text-[#001f40]">
          Summary
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-[#001f40]/75">
          {items.map((i) => (
            <li key={i.id} className="flex justify-between gap-4">
              <span className="line-clamp-2">
                {i.title}{" "}
                <span className="text-[#001f40]/45">×{i.quantity}</span>
              </span>
              <span className="shrink-0 tabular-nums font-medium text-[#001f40]">
                {formatLkr(i.price_lkr * i.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <dl className="mt-6 space-y-2 border-t border-neutral-100 pt-4 text-sm">
          <div className="flex justify-between text-[#001f40]/75">
            <dt>Books subtotal</dt>
            <dd className="tabular-nums font-medium">{formatLkr(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-[#001f40]/75">
            <dt>Total weight</dt>
            <dd className="tabular-nums font-medium">
              {formatWeightGrams(totalWeight)}
            </dd>
          </div>
          <div className="flex justify-between text-[#001f40]/75">
            <dt>Shipping</dt>
            <dd className="tabular-nums font-medium text-[#037eff]">
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
