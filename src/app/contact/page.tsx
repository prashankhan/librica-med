import type { Metadata } from "next";
import { WHATSAPP_WA_ME, WHATSAPP_DISPLAY } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/button";
import { ContactFormClient } from "@/components/contact/contact-form-client";
import {
  PAGE_FIELD_LABEL_CLASS,
  PAGE_H1_CLASS,
  PAGE_LEAD_CLASS,
  PAGE_PRIMARY_CTA_CLASS,
  PAGE_READING_MAX_CLASS,
  PAGE_SECTION_TITLE_CLASS,
  PageContainer,
  SECTION_PAD_Y,
} from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Librica Med on WhatsApp for medical book enquiries, order support, and delivery questions across Sri Lanka.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageContainer className={SECTION_PAD_Y}>
      <div className={PAGE_READING_MAX_CLASS}>
        <header className="mb-8">
          <h1 className={PAGE_H1_CLASS}>Contact</h1>
          <p className={`mt-4 ${PAGE_LEAD_CLASS}`}>
            Whether you need a recommendation, a stock check, or help after
            placing an order, WhatsApp is the fastest way to reach our team. We
            aim for concise, professional replies during working hours.
          </p>
        </header>

        <ContactFormClient />

        <h2 className={`mt-12 ${PAGE_SECTION_TITLE_CLASS}`}>Direct contact</h2>
        <p className={`mt-3 ${PAGE_LEAD_CLASS}`}>
          You can also reach us using the details below without using the form.
        </p>

        <div className="mt-6 rounded-xl border border-gray-100 bg-white p-8 sm:p-10">
          <p className={PAGE_FIELD_LABEL_CLASS}>WhatsApp</p>
          <a
            href={WHATSAPP_WA_ME}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xl font-bold tabular-nums tracking-tight text-[#037eff] hover:underline md:text-2xl"
          >
            {WHATSAPP_DISPLAY}
          </a>
        </div>

        <ButtonLink
          href={WHATSAPP_WA_ME}
          variant="outline"
          className={`mt-8 ${PAGE_PRIMARY_CTA_CLASS}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open WhatsApp (blank chat)
        </ButtonLink>
      </div>
    </PageContainer>
  );
}
