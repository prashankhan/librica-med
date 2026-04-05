import type { Metadata } from "next";
import {
  SITE_URL,
  WHATSAPP_WA_ME,
  WHATSAPP_DISPLAY,
} from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Librica Med on WhatsApp for medical book enquiries, order support, and delivery questions across Sri Lanka.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-[#001f40] sm:text-4xl">
        Contact
      </h1>
      <p className="mt-6 text-sm leading-relaxed text-[#001f40]/65">
        Whether you need a recommendation, a stock check, or help after
        placing an order, WhatsApp is the fastest way to reach our team. We aim
        for concise, professional replies during working hours.
      </p>

      <div className="mt-10 space-y-6 rounded-2xl border border-neutral-200/90 bg-white p-8 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#001f40]/45">
            WhatsApp
          </p>
          <a
            href={WHATSAPP_WA_ME}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-lg font-semibold tracking-tight text-[#037eff] hover:underline"
          >
            {WHATSAPP_DISPLAY}
          </a>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#001f40]/45">
            Website
          </p>
          <p className="mt-2 text-sm font-medium text-[#001f40]">
            <a href={SITE_URL} className="hover:text-[#037eff] transition-colors">
              libricamed.lk
            </a>
          </p>
        </div>
      </div>

      <ButtonLink
        href={WHATSAPP_WA_ME}
        variant="primary"
        className="mt-10"
        target="_blank"
      >
        Open WhatsApp
      </ButtonLink>
    </div>
  );
}
