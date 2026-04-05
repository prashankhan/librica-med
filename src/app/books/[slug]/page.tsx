import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookBySlug, getAllBooks } from "@/lib/airtable/books";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import { BookGallery } from "@/components/book/book-gallery";
import { BookDetailActions } from "@/components/book/book-detail-actions";
import { BookCard } from "@/components/book/book-card";
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
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <nav className="text-xs text-[#001f40]/50" aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-[#037eff]">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/shop" className="hover:text-[#037eff]">
                Shop
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-[#001f40]/70">{book.title}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,400px)_1fr] lg:items-start">
          <BookGallery
            coverUrl={book.cover_image}
            galleryUrls={book.gallery_images}
            title={book.title}
          />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#001f40] sm:text-4xl">
              {book.title}
            </h1>
            {book.description ? (
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#001f40]/70 whitespace-pre-line">
                {book.description}
              </div>
            ) : (
              <p className="mt-6 text-sm text-[#001f40]/55">
                Full description coming soon. Contact us on WhatsApp for
                edition and availability questions.
              </p>
            )}
            <div className="mt-8 border-t border-neutral-100 pt-8">
              <BookDetailActions book={book} />
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-20 border-t border-neutral-200 pt-14">
            <h2 className="text-xl font-semibold tracking-tight text-[#001f40]">
              You may also like
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {related.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
