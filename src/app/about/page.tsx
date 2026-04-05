import type { Metadata } from "next";
import { TRUST_TAGLINE, REGISTRATION_NUMBER } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Librica Med",
  description:
    "Librica Med is Sri Lanka’s registered online medical book shop—focused on healthcare education, islandwide delivery, and human-centred ordering.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-[#001f40] sm:text-4xl">
        About Librica Med
      </h1>
      <p className="mt-6 text-sm font-medium uppercase tracking-widest text-[#037eff]">
        {TRUST_TAGLINE}
      </p>
      <p className="mt-2 text-xs text-[#001f40]/45">
        Registration No: {REGISTRATION_NUMBER}
      </p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-[#001f40]/70">
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
        <ButtonLink href="/shop" variant="primary">
          Explore the shop
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline">
          Contact
        </ButtonLink>
      </div>
    </div>
  );
}
