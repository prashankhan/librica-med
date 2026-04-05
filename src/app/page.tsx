import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { BookCard } from "@/components/book/book-card";
import { getAllBooks, getFeaturedBooks } from "@/lib/airtable/books";
import { getShippingRules } from "@/lib/airtable/shipping-rules";
import { formatLkr } from "@/lib/format";
import {
  WHATSAPP_WA_ME,
  TRUST_TAGLINE,
  REGISTRATION_NUMBER,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Medical Books with Islandwide Delivery",
  description:
    "Sri Lanka’s trusted online medical bookstore. Curated titles for medicine, nursing, pharmacy, and allied health—with simple WhatsApp-assisted ordering.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const books = await getAllBooks();
  const featured = getFeaturedBooks(books);
  const rules = await getShippingRules();
  const entryShipping = rules[0]?.price_lkr;

  return (
    <>
      <section className="border-b border-neutral-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#037eff]">
            {TRUST_TAGLINE}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[#001f40] sm:text-5xl">
            Sri Lanka’s Trusted Online Medical Bookstore
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-medium tracking-tight text-[#001f40]/85">
            Professional Medical Books for Future Healthcare Leaders
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#001f40]/65">
            Librica Med is a calm, focused place to discover medical and
            healthcare-related books for students and exam candidates across
            Sri Lanka. Browse curated titles, see transparent weight-based
            shipping, and confirm your order easily through WhatsApp—without
            payment friction on the site.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/shop" variant="primary">
              Shop books
            </ButtonLink>
            <ButtonLink
              href={WHATSAPP_WA_ME}
              variant="outline"
              target="_blank"
            >
              Contact on WhatsApp
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#001f40]">
              Featured books
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[#001f40]/55">
              Hand-picked titles from our catalogue—ideal for programmes in
              medicine, nursing, pharmacy, and allied health.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-[#037eff] hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((book, i) => (
            <BookCard key={book.id} book={book} priorityImage={i < 4} />
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-[#001f40]">
            Why Librica Med
          </h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Registered & focused",
                body: "Sri Lanka’s first registered online medical book shop—built around healthcare education, not generic retail noise.",
              },
              {
                title: "Islandwide delivery",
                body: "Reliable shipping across the island. Fees follow clear weight brackets so you always know what to expect.",
              },
              {
                title: "Curated catalogue",
                body: "Titles chosen with medical, nursing, pharmacy, and postgraduate learners in mind.",
              },
              {
                title: "WhatsApp-assisted orders",
                body: "Checkout captures your details, saves the order, then opens WhatsApp with a structured message for the team.",
              },
            ].map((item) => (
              <li key={item.title}>
                <p className="text-sm font-semibold tracking-tight text-[#001f40]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#001f40]/60">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-200/90 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-xl font-semibold tracking-tight text-[#001f40]">
            Delivery & shipping
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#001f40]/60">
            Shipping is calculated automatically from the total weight of books
            in your cart. The same islandwide rates apply whether you are in
            Colombo, Kandy, Jaffna, or anywhere in between.
            {entryShipping != null ? (
              <>
                {" "}
                Lightweight orders from{" "}
                <span className="font-medium text-[#001f40]">
                  {formatLkr(entryShipping)}
                </span>{" "}
                upward—see the full table on our delivery page.
              </>
            ) : null}
          </p>
          <ButtonLink href="/delivery" variant="outline" className="mt-6">
            Delivery details
          </ButtonLink>
        </div>
      </section>

      <section className="bg-[#001f40] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium tracking-tight text-white/90">
            {TRUST_TAGLINE}
          </p>
          <p className="mt-2 text-center text-xs text-white/55">
            Registration No: {REGISTRATION_NUMBER}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#037eff]/20 bg-[#037eff]/5 px-8 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-semibold tracking-tight text-[#001f40]">
            Prefer to chat?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#001f40]/65">
            Ask a question, check stock, or walk through an order with our
            team on WhatsApp. We respond during working hours and aim to keep
            every conversation clear and professional.
          </p>
          <ButtonLink
            href={WHATSAPP_WA_ME}
            variant="primary"
            className="mt-8"
            target="_blank"
          >
            Message Librica Med
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
