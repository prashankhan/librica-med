import type { Metadata } from "next";
import { TRUST_TAGLINE, REGISTRATION_NUMBER } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/button";
import {
  PAGE_H1_CLASS,
  PAGE_LEAD_CLASS,
  PAGE_META_LINE_CLASS,
  PAGE_PRIMARY_CTA_CLASS,
  PAGE_READING_MAX_CLASS,
  PageContainer,
  SECTION_PAD_Y,
} from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "About Librica Med",
  description:
    "Librica Med is Sri Lanka’s registered online medical book shop—focused on healthcare education, islandwide delivery, and human-centred ordering.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageContainer className={SECTION_PAD_Y}>
      <div className={PAGE_READING_MAX_CLASS}>
        <header className="mb-8">
          <h1 className={PAGE_H1_CLASS}>About Librica Med</h1>
          <p className="mt-4 text-sm font-bold uppercase tracking-widest text-[#037eff] md:text-base">
            {TRUST_TAGLINE}
          </p>
          <p className={`mt-2 tabular-nums ${PAGE_META_LINE_CLASS}`}>
            Registration No: {REGISTRATION_NUMBER}
          </p>
        </header>

        <div className={`space-y-6 ${PAGE_LEAD_CLASS}`}>
          <p>
            Librica Med exists for one discipline: healthcare learning. We serve
            medical students, nursing and pharmacy programmes, allied health
            trainees, and doctors preparing for postgraduate exams. The catalogue
            is intentionally narrow and serious—clinical references, examination
            guides, and foundational texts that belong on a professional shelf.
          </p>
          <p>
            As Sri Lanka’s first registered online medical book shop, we carry a
            responsibility to be transparent. Prices, weights, and shipping
            brackets are visible before you commit. When you check out, your
            order is written to our records first; only then does WhatsApp open
            with a structured message so our team can confirm stock, delivery
            timing, and payment arrangements in a conversation—not a faceless
            ticket.
          </p>
          <p>
            Islandwide delivery is central to the model. Whether you study on the
            coast, in the hills, or in greater Colombo, the same weight-based
            schedule applies. We would rather under-promise on speed and
            over-deliver on clarity than hide fees behind a generic “shipping at
            checkout” line.
          </p>
          <p>
            This is still a human business. The website is the calm front desk;
            WhatsApp is the colleague who knows which edition just came back into
            stock. If something on the site ever feels unclear, we want to hear
            about it—so the next student has a smoother path.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink
            href="/shop"
            variant="primary"
            className={PAGE_PRIMARY_CTA_CLASS}
          >
            Explore the shop
          </ButtonLink>
          <ButtonLink
            href="/contact"
            variant="outline"
            className={PAGE_PRIMARY_CTA_CLASS}
          >
            Contact
          </ButtonLink>
        </div>
      </div>
    </PageContainer>
  );
}
