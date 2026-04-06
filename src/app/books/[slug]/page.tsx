import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookBySlug, getAllBooks } from "@/lib/airtable/books";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import { formatLkr, formatWeightGrams } from "@/lib/format";
import { BookGallery } from "@/components/book/book-gallery";
import { BookDetailActions } from "@/components/book/book-detail-actions";
import { BookCard } from "@/components/book/book-card";
import {
  PAGE_H1_CLASS,
  PAGE_SECTION_TITLE_CLASS,
  PAGE_LEAD_CLASS,
  PageContainer,
  ProductGrid,
  SECTION_PAD_Y,
} from "@/components/layout/page-container";
import {
  BreadcrumbJsonLd,
  ProductJsonLd,
} from "@/components/seo/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(decodeURIComponent(slug));
  if (!book) {
    return { title: "Book not found" };
  }
  const url = `${SITE_URL}/books/${book.slug}`;
  return {
    title: book.title,
    description:
      book.description.slice(0, 155) ||
      `${book.title} — available at ${SITE_NAME} with islandwide delivery.`,
    alternates: { canonical: `/books/${book.slug}` },
    openGraph: {
      title: book.title,
      description: book.description.slice(0, 200) || book.title,
      url,
      type: "website",
      images: book.cover_image ? [{ url: book.cover_image }] : undefined,
    },
    twitter: {
      card: book.cover_image ? "summary_large_image" : "summary",
      title: book.title,
      description: book.description.slice(0, 200) || book.title,
    },
  };
}

export default async function BookDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const book = await getBookBySlug(decodeURIComponent(slug));
  if (!book) notFound();

  const all = await getAllBooks();
  const related = all
    .filter((b) => b.id !== book.id && b.status === "active")
    .slice(0, 4);

  const canonical = `${SITE_URL}/books/${book.slug}`;

  return (
    <>
      <ProductJsonLd book={book} url={canonical} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Shop", url: `${SITE_URL}/shop` },
          { name: book.title, url: canonical },
        ]}
      />
      <PageContainer className={SECTION_PAD_Y}>
        <nav
          className="text-sm font-medium text-gray-500 md:text-base"
          aria-label="Breadcrumb"
        >
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link
                href="/"
                className="transition duration-200 ease-out hover:text-[#037eff] hover:underline"
              >
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/shop"
                className="transition duration-200 ease-out hover:text-[#037eff] hover:underline"
              >
                Shop
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="line-clamp-2 text-[#001f40]">{book.title}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="min-w-0">
            <BookGallery
              coverUrl={book.cover_image}
              galleryUrls={book.gallery_images}
              title={book.title}
            />
          </div>
          <div className="min-w-0 space-y-4">
            <h1 className={`${PAGE_H1_CLASS} max-w-2xl`}>{book.title}</h1>
            <p className="text-xl font-bold tabular-nums text-[#037eff] md:text-2xl">
              {formatLkr(book.price_lkr)}
            </p>
            <p className="text-base font-medium text-gray-500">
              Weight: {formatWeightGrams(book.weight_grams)} · Islandwide
              shipping calculated at checkout
            </p>
            {book.description ? (
              <div
                className={`${PAGE_LEAD_CLASS} max-w-2xl whitespace-pre-line`}
              >
                {book.description}
              </div>
            ) : (
              <p className={`${PAGE_LEAD_CLASS} max-w-2xl`}>
                Full description coming soon. Contact us on WhatsApp for
                edition and availability questions.
              </p>
            )}
            <div className="border-t border-gray-100 pt-6">
              <BookDetailActions book={book} />
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-16 border-t border-gray-100 pt-12 md:mt-20 md:pt-14">
            <h2 className={`mb-8 ${PAGE_SECTION_TITLE_CLASS}`}>
              You may also like
            </h2>
            <ProductGrid>
              {related.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </ProductGrid>
          </section>
        ) : null}
      </PageContainer>
    </>
  );
}
