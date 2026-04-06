import type { Metadata } from "next";
import { getShippingRules } from "@/lib/airtable/shipping-rules";
import { formatLkr, formatWeightGrams } from "@/lib/format";
import { ButtonLink } from "@/components/ui/button";
import {
  PAGE_H1_CLASS,
  PAGE_LEAD_CLASS,
  PAGE_PRIMARY_CTA_CLASS,
  PAGE_READING_MAX_CLASS,
  PageContainer,
  SECTION_PAD_Y,
} from "@/components/layout/page-container";

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
    <PageContainer className={SECTION_PAD_Y}>
      <div className={PAGE_READING_MAX_CLASS}>
        <header className="mb-8">
          <h1 className={PAGE_H1_CLASS}>Delivery information</h1>
          <p className={`mt-4 ${PAGE_LEAD_CLASS}`}>
            Librica Med delivers medical books islandwide. Shipping is never a
            flat guess—it is tied to the combined weight of the books in your
            cart. Your cart and checkout pages calculate the fee live so you see
            the same numbers our team sees when you message on WhatsApp.
          </p>
          <p className={`mt-4 ${PAGE_LEAD_CLASS}`}>
            This version of the store does not collect card payments online.
            After checkout we save your order, then WhatsApp opens with a clean
            summary you can discuss directly with our team.
          </p>
        </header>

        <div className="min-w-0 w-full overflow-x-auto">
          <div className="w-full max-w-full min-w-0 rounded-xl border border-gray-100 bg-white">
            <table className="w-full table-fixed border-collapse text-left text-base">
              <caption className="sr-only">
                Weight-based islandwide shipping brackets in Sri Lankan Rupees
              </caption>
              <colgroup>
                <col className="w-[58%] sm:w-[62%]" />
                <col className="w-[42%] sm:w-[38%]" />
              </colgroup>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3.5 pr-3 font-semibold text-[#001f40] md:px-5 md:pr-4">
                    Total order weight
                  </th>
                  <th className="px-4 py-3.5 pl-3 text-right font-semibold text-[#001f40] md:px-5 md:pl-4">
                    Shipping (LKR)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {sorted.map((rule) => (
                  <tr
                    key={rule.id}
                    className="transition duration-200 ease-out hover:bg-gray-50/80"
                  >
                    <td className="wrap-break-word px-4 py-3.5 pr-3 align-top text-gray-600 md:px-5 md:pr-4">
                      {formatWeightGrams(rule.min_weight_grams)}
                      {" — "}
                      {rule.max_weight_grams === null
                        ? "and above"
                        : formatWeightGrams(rule.max_weight_grams)}
                    </td>
                    <td className="px-4 py-3.5 pl-3 text-right align-top text-lg font-bold tabular-nums text-[#037eff] md:px-5 md:pl-4 md:text-xl">
                      {formatLkr(rule.price_lkr)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink
            href="/shop"
            variant="primary"
            className={PAGE_PRIMARY_CTA_CLASS}
          >
            Browse books
          </ButtonLink>
          <ButtonLink
            href="/cart"
            variant="outline"
            className={PAGE_PRIMARY_CTA_CLASS}
          >
            View cart
          </ButtonLink>
        </div>
      </div>
    </PageContainer>
  );
}
