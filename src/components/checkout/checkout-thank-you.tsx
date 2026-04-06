import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import {
  PAGE_LEAD_CLASS,
  PAGE_PRIMARY_CTA_CLASS,
  PANEL_TITLE_CLASS,
} from "@/components/layout/page-container";

interface CheckoutThankYouProps {
  orderId: string;
  whatsappUrl: string;
}

export function CheckoutThankYou({ orderId, whatsappUrl }: CheckoutThankYouProps) {
  const [copyLabel, setCopyLabel] = useState("Copy");

  async function handleCopyOrderId() {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopyLabel("Copied");
      window.setTimeout(() => setCopyLabel("Copy"), 1500);
    } catch {
      setCopyLabel("Failed");
      window.setTimeout(() => setCopyLabel("Copy"), 1500);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-8 md:p-10">
      <p className={`${PANEL_TITLE_CLASS} text-[#037eff]`}>Order received</p>
      <p className={`mt-4 max-w-2xl ${PAGE_LEAD_CLASS}`}>
        Thank you for your order. We&apos;ve opened WhatsApp in a new tab so you
        can message us with your order details. Our team will review everything
        and get back to you there.
      </p>
      <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
        Please keep this reference handy if you contact us about your order.
      </p>
      <div className="mt-8 rounded-xl border border-gray-200 bg-white px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Order reference
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <p className="font-mono text-xl font-semibold tracking-tight text-[#001f40] md:text-2xl">
            {orderId}
          </p>
          <button
            type="button"
            onClick={handleCopyOrderId}
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#001f40] transition duration-200 ease-out hover:border-[#037eff]/40 hover:bg-[#037eff]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#037eff]"
            aria-live="polite"
          >
            {copyLabel}
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <ButtonLink
          href="/shop"
          variant="primary"
          className={`w-full justify-center sm:w-auto ${PAGE_PRIMARY_CTA_CLASS}`}
        >
          Continue shopping
        </ButtonLink>
        <ButtonLink
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          className={`w-full justify-center sm:w-auto ${PAGE_PRIMARY_CTA_CLASS}`}
        >
          Open WhatsApp again
        </ButtonLink>
      </div>
    </div>
  );
}
