import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, WHATSAPP_DISPLAY } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects personal information for book orders and WhatsApp-assisted service in Sri Lanka.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-[#001f40] sm:text-4xl">
        Privacy policy
      </h1>
      <p className="mt-4 text-sm text-[#001f40]/55">
        Last updated: April 2026 · Applies to customers using {SITE_URL}
      </p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#001f40]/70">
        <section>
          <h2 className="text-base font-semibold tracking-tight text-[#001f40]">
            Who we are
          </h2>
          <p className="mt-3">
            {SITE_NAME} operates an online catalogue of medical and
            healthcare-related books for customers in Sri Lanka. This policy
            explains what we collect when you browse, order, or contact us—
            including through WhatsApp ({WHATSAPP_DISPLAY}).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold tracking-tight text-[#001f40]">
            Information we collect
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-[#001f40]">Order details:</strong> name,
              phone number, delivery address, and the books you select
              (including quantities, weights used for shipping, and prices).
            </li>
            <li>
              <strong className="text-[#001f40]">Technical data:</strong> basic
              server and analytics information typical of websites (such as IP
              address, browser type, and pages viewed) to keep the service
              secure and reliable.
            </li>
            <li>
              <strong className="text-[#001f40]">WhatsApp conversations:</strong>{" "}
              messages you send to our business number, which may repeat or
              supplement information already submitted on the website.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold tracking-tight text-[#001f40]">
            How we use information
          </h2>
          <p className="mt-3">
            We use personal data to fulfil book orders, calculate shipping,
            communicate about delivery and availability, maintain internal
            records, and improve our service. Because we do not operate an
            integrated card-payment checkout on this website, we do not collect
            card numbers through these pages.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold tracking-tight text-[#001f40]">
            Legal bases & retention
          </h2>
          <p className="mt-3">
            Processing is necessary to perform our contract with you (supplying
            books), to meet legal obligations (such as tax and record-keeping
            where applicable), and for legitimate interests in operating a
            secure store. We retain order records for as long as needed to
            support warranties, disputes, accounting, and operational analysis,
            unless a shorter period is agreed or required by law.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold tracking-tight text-[#001f40]">
            Sharing
          </h2>
          <p className="mt-3">
            We share data with service providers who help us run the business—
            for example courier partners (for delivery), cloud or database
            providers (for order storage), and Meta/WhatsApp infrastructure when
            you message us there. We do not sell personal information to
            brokers.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold tracking-tight text-[#001f40]">
            Security
          </h2>
          <p className="mt-3">
            We use reasonable technical and organisational measures to protect
            information. No online system is perfectly secure; please avoid
            sharing sensitive health information unless truly necessary for
            delivery (e.g., safe access instructions).
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold tracking-tight text-[#001f40]">
            Your choices
          </h2>
          <p className="mt-3">
            You may request access, correction, or deletion of certain personal
            data, subject to legal exceptions, by contacting us through the
            channels listed on our Contact page. If you are unsatisfied with our
            response, you may escalate to relevant authorities in Sri Lanka.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold tracking-tight text-[#001f40]">
            Updates
          </h2>
          <p className="mt-3">
            We may revise this policy as our operations evolve. Material changes
            will be reflected on this page with an updated date.
          </p>
        </section>
      </div>
    </div>
  );
}
