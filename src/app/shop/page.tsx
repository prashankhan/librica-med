import type { Metadata } from "next";
import { ShopClient } from "@/components/book/shop-client";
import { getAllBooks } from "@/lib/airtable/books";
import {
  PAGE_H1_CLASS,
  PAGE_LEAD_CLASS,
  PageContainer,
  SECTION_PAD_Y,
} from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Shop Medical Books",
  description:
    "Browse Librica Med’s catalogue of medical, nursing, and pharmacy books. Search by title and add to cart for islandwide delivery.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const books = await getAllBooks();

  return (
    <PageContainer className={SECTION_PAD_Y}>
      <header className="mb-8">
        <h1 className={PAGE_H1_CLASS}>Shop</h1>
        <p className={`mt-4 max-w-2xl ${PAGE_LEAD_CLASS}`}>
          Every book ships with weight-based islandwide fees. Add to cart,
          review totals, and complete checkout—we save your order and open
          WhatsApp with the details.
        </p>
      </header>
      <ShopClient books={books} />
    </PageContainer>
  );
}
