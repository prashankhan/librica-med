import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, WHATSAPP_DISPLAY } from "@/lib/site-config";
import {
  PAGE_H1_CLASS,
  PAGE_LEAD_CLASS,
  PAGE_META_LINE_CLASS,
  PAGE_READING_MAX_CLASS,
  PAGE_SECTION_TITLE_CLASS,
  PageContainer,
  SECTION_PAD_Y,
} from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms of use and ordering for ${SITE_NAME}, Sri Lanka’s registered online medical book shop, including WhatsApp-assisted fulfilment.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PageContainer className={SECTION_PAD_Y}>
      <div className={PAGE_READING_MAX_CLASS}>
        <header className="mb-8">
          <h1 className={PAGE_H1_CLASS}>Terms & conditions</h1>
          <p className={`mt-4 ${PAGE_META_LINE_CLASS}`}>
            Last updated: April 2026 · Governs use of {SITE_URL}
          </p>
        </header>

        <div className={`space-y-8 ${PAGE_LEAD_CLASS}`}>
          <section>
            <h2 className={PAGE_SECTION_TITLE_CLASS}>Agreement</h2>
            <p className="mt-3">
              By accessing {SITE_NAME} at {SITE_URL}, creating a cart, submitting
              checkout details, or messaging us on WhatsApp ({WHATSAPP_DISPLAY}),
              you agree to these terms. If you do not agree, please do not use the
              service.
            </p>
          </section>

          <section>
            <h2 className={PAGE_SECTION_TITLE_CLASS}>Nature of the service</h2>
            <p className="mt-3">
              We sell physical books aimed at medical, nursing, pharmacy, and
              allied health audiences in Sri Lanka. Product descriptions, weights,
              and prices are maintained carefully but may occasionally contain
              errors. We may correct mistakes or withdraw listings without prior
              notice.
            </p>
          </section>

          <section>
            <h2 className={PAGE_SECTION_TITLE_CLASS}>
              Ordering & WhatsApp confirmation
            </h2>
            <p className="mt-3">
              The website helps you assemble an order and transmits structured
              details to our team.{" "}
              <strong className="text-[#001f40]">
                A binding sale is not complete until we confirm availability,
                delivery feasibility, and payment arrangements with you—
                typically via WhatsApp or another agreed channel.
              </strong>{" "}
              If an item is out of stock or a price needs adjustment, we will
              explain options before you pay.
            </p>
          </section>

          <section>
            <h2 className={PAGE_SECTION_TITLE_CLASS}>Payments</h2>
            <p className="mt-3">
              This version of the website does not process card payments. Payment
              methods (bank transfer, cash on delivery where offered, or other
              locally appropriate means) are agreed after order review. Do not
              send card details over WhatsApp.
            </p>
          </section>

          <section>
            <h2 className={PAGE_SECTION_TITLE_CLASS}>Shipping & risk</h2>
            <p className="mt-3">
              Shipping fees are calculated from the total weight of books in your
              order using the published brackets. Delivery timelines depend on
              courier capacity, weather, and your location. Risk of loss or damage
              passes according to the arrangements we confirm with you and the
              carrier’s terms.
            </p>
          </section>

          <section>
            <h2 className={PAGE_SECTION_TITLE_CLASS}>Returns & defects</h2>
            <p className="mt-3">
              Because many products are educational print titles, returns are
              handled case-by-case (for example mis-shipped editions or
              manufacturing defects). Contact us promptly with photos where
              relevant. Consumer rights under applicable Sri Lankan law are not
              excluded.
            </p>
          </section>

          <section>
            <h2 className={PAGE_SECTION_TITLE_CLASS}>Intellectual property</h2>
            <p className="mt-3">
              Site content, branding, and catalogue data belong to {SITE_NAME} or
              its licensors. You may not scrape, resell, or misrepresent our
              listings without permission.
            </p>
          </section>

          <section>
            <h2 className={PAGE_SECTION_TITLE_CLASS}>Limitation of liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, {SITE_NAME} is not liable
              for indirect or consequential losses arising from delays, stock
              shortages, or third-party courier issues. Our aggregate liability
              for any claim relating to a specific order is limited to the amount
              you paid for that order, except where liability cannot be limited by
              law.
            </p>
          </section>

          <section>
            <h2 className={PAGE_SECTION_TITLE_CLASS}>Governing law</h2>
            <p className="mt-3">
              These terms are governed by the laws of Sri Lanka. Courts in Sri
              Lanka shall have non-exclusive jurisdiction, without prejudice to
              mandatory consumer protections.
            </p>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
