import type { Metadata } from "next";
import { ShopClient } from "@/components/book/shop-client";
import { getAllBooks } from "@/lib/airtable/books";

export const metadata: Metadata = {
  title: "Shop Medical Books",
  description:
    "Browse Librica Med’s catalogue of medical, nursing, and pharmacy books. Search by title and add to cart for islandwide delivery.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const books = await getAllBooks();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mb-12 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[#001f40] sm:text-4xl">
          Shop
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#001f40]/60">
          Every title ships with weight-based islandwide fees. Add to cart,
          review totals, and complete checkout—we save your order and open
          WhatsApp with the details.
        </p>
      </header>
      <ShopClient books={books} />
    </div>
  );
}
