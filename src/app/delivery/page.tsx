import type { Metadata } from "next";
import { getShippingRules } from "@/lib/airtable/shipping-rules";
import { formatLkr, formatWeightGrams } from "@/lib/format";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Delivery Information",
  description:
    "Islandwide, weight-based shipping for medical books from Librica Med. Transparent LKR brackets for every order total.",
  alternates: { canonical: "/delivery" },
};

export default async function DeliveryPage() {
  const rules = await getShippingRules();
  const sorted = [...rules].sort(
    (a, b) => a.min_weight_grams - b.min_weight_grams,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[#001f40] sm:text-4xl">
          Delivery information
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#001f40]/60">
          Librica Med delivers medical books islandwide. Shipping is never a
          flat guess—it is tied to the combined weight of the books in your
          cart. Your cart and checkout pages calculate the fee live so you see
          the same numbers our team sees when you message on WhatsApp.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#001f40]/60">
          This version of the store does not collect card payments online.
          After checkout we save your order, then WhatsApp opens with a clean
          summary you can discuss directly with our team.
        </p>
      </header>

      <div className="mt-12 overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            Weight-based islandwide shipping brackets in Sri Lankan Rupees
          </caption>
          <thead className="bg-[#001f40] text-white">
            <tr>
              <th className="px-5 py-4 font-semibold tracking-tight">
                Total order weight
              </th>
              <th className="px-5 py-4 font-semibold tracking-tight">
                Shipping (LKR)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {sorted.map((rule) => (
              <tr key={rule.id} className="hover:bg-neutral-50/80">
                <td className="px-5 py-4 text-[#001f40]/80">
                  {formatWeightGrams(rule.min_weight_grams)}
                  {" — "}
                  {rule.max_weight_grams === null
                    ? "and above"
                    : formatWeightGrams(rule.max_weight_grams)}
                </td>
                <td className="px-5 py-4 font-semibold tabular-nums text-[#037eff]">
                  {formatLkr(rule.price_lkr)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/shop" variant="primary">
          Browse books
        </ButtonLink>
        <ButtonLink href="/cart" variant="outline">
          View cart
        </ButtonLink>
      </div>
    </div>
  );
}
