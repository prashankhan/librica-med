import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  MessageCircle,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { BookCard } from "@/components/book/book-card";
import { getAllBooks, getFeaturedBooks } from "@/lib/airtable/books";
import { getShippingRules } from "@/lib/airtable/shipping-rules";
import { formatLkr } from "@/lib/format";
import { WHATSAPP_WA_ME } from "@/lib/site-config";
import {
  PageContainer,
  ProductGrid,
  SECTION_PAD_Y,
} from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Medical Books with Islandwide Delivery",
  description:
    "Sri Lanka’s trusted online medical bookstore. Curated titles for medicine, nursing, pharmacy, and allied health—with simple WhatsApp-assisted ordering.",
  alternates: { canonical: "/" },
};

const featureIconClass =
  "h-7 w-7 shrink-0 text-[#037eff] md:h-8 md:w-8";

interface HomeFeatureItem {
  title: string;
  body: string;
  icon: LucideIcon;
}

const homeFeatureItems: HomeFeatureItem[] = [
  {
    title: "Islandwide delivery",
    body: "Reliable delivery to every district with transparent, weight-based shipping fees. You always see the full cost before you confirm your order.",
    icon: Truck,
  },
  {
    title: "Curated catalogue",
    body: "Titles chosen for medicine, nursing, pharmacy, and allied health study. One focused medical catalogue instead of scattered general-aisle picks.",
    icon: BookOpen,
  },
  {
    title: "WhatsApp-assisted orders",
    body: "Checkout saves your order and opens WhatsApp with a prefilled message. We reply fast—no long threads.",
    icon: MessageCircle,
  },
];

export default async function HomePage() {
  const books = await getAllBooks();
  const featured = getFeaturedBooks(books);
  const rules = await getShippingRules();
  const entryShipping = rules[0]?.price_lkr;

  const heroBullets = [
    "Islandwide delivery",
    "Weight-based transparent shipping",
    "WhatsApp-assisted ordering",
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-white bg-[url('/lib%20med%20bg.png')] bg-cover bg-position-[62%_center] bg-no-repeat">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#fff_0%,#fff_50%,rgba(255,255,255,0)_65%,rgba(255,255,255,0)_100%)]"
          aria-hidden
        />
        <PageContainer className="relative z-10 py-14 md:py-16 lg:py-20">
          <div className="min-w-0 max-w-2xl lg:max-w-[700px]">
            <h1 className="max-w-full text-5xl font-bold leading-[1.06] tracking-tighter text-[#001f40] sm:text-6xl md:text-7xl">
              Sri Lanka’s Trusted
              <br />
              Online Medical Bookstore
            </h1>
            <p className="mt-4 text-xl font-medium tracking-tight text-[#001f40]/70 md:text-2xl md:font-semibold md:tracking-tight">
              Professional Medical Books for Future Healthcare Leaders
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-4 lg:flex-nowrap lg:gap-x-5">
              {heroBullets.map((text) => (
                <li
                  key={text}
                  className="flex shrink-0 items-center gap-3 text-base font-medium text-[#001f40] md:text-lg"
                >
                  <FilledCheckIcon />
                  {text}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Librica Med is a calm, focused place to discover medical and
              healthcare-related books for students and exam candidates across
              Sri Lanka. Browse curated titles, see transparent weight-based
              shipping, and confirm your order easily through WhatsApp—without
              payment friction on the site.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink
                href="/shop"
                variant="primary"
                className="px-8! py-4! text-lg! font-bold! tracking-tight"
              >
                Shop Books
              </ButtonLink>
              <ButtonLink
                href={WHATSAPP_WA_ME}
                variant="outline"
                className="px-8! py-4! text-lg! font-bold! tracking-tight"
                target="_blank"
              >
                Contact on WhatsApp
              </ButtonLink>
            </div>
          </div>
        </PageContainer>
      </section>

      <section
        className={`-mt-px bg-secondary text-white ${SECTION_PAD_Y}`}
      >
        <PageContainer>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {homeFeatureItems.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex flex-col gap-3">
                <Icon
                  className={featureIconClass}
                  aria-hidden
                  strokeWidth={2}
                />
                <div className="min-w-0">
                  <p className="text-lg font-bold tracking-tight text-white md:text-xl">
                    {title}
                  </p>
                  <p className="mt-3 text-base font-medium leading-relaxed text-white/80 md:text-lg">
                    {body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </PageContainer>
      </section>

      <section
        className={`${SECTION_PAD_Y} border-t border-gray-100 bg-white`}
      >
        <PageContainer>
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <h2 className="text-2xl font-bold tracking-tight text-[#001f40] md:text-3xl">
              Featured books
            </h2>
            <Link
              href="/shop"
              className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg py-2 text-base font-semibold text-[#037eff] transition duration-200 ease-out hover:gap-2 hover:underline sm:self-auto"
            >
              View all
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </div>
          <ProductGrid>
            {featured.map((book, i) => (
              <BookCard key={book.id} book={book} priorityImage={i < 4} />
            ))}
          </ProductGrid>
        </PageContainer>
      </section>

      <section className={`${SECTION_PAD_Y} bg-gray-100`}>
        <PageContainer className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#001f40] md:text-3xl">
            Delivery & shipping
          </h2>
          <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-gray-600 md:mt-6 md:text-lg">
            Shipping is calculated automatically from the total weight of books
            in your cart. The same islandwide rates apply whether you are in
            Colombo, Kandy, Jaffna, or anywhere in between.
            {entryShipping != null ? (
              <>
                {" "}
                Lightweight orders from{" "}
                <span className="font-bold tabular-nums text-[#037eff]">
                  {formatLkr(entryShipping)}
                </span>{" "}
                upward—see the full table on our delivery page.
              </>
            ) : null}
          </p>
          <ButtonLink
            href="/delivery"
            variant="primary"
            className="mt-8 px-8! py-4! text-lg! font-bold! tracking-tight"
          >
            Delivery details
          </ButtonLink>
        </PageContainer>
      </section>
    </>
  );
}

function FilledCheckIcon() {
  return (
    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#037eff] md:h-7 md:w-7">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-white md:h-[18px] md:w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m7.5 12.5 3 3 6-6" />
      </svg>
    </span>
  );
}
