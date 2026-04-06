import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/cart-page-client";
import {
  PAGE_H1_CLASS,
  PAGE_LEAD_CLASS,
  PageContainer,
  SECTION_PAD_Y,
} from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review your medical books, quantities, and islandwide shipping before checkout at Librica Med.",
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return (
    <PageContainer className={SECTION_PAD_Y}>
      <header className="mb-8">
        <h1 className={PAGE_H1_CLASS}>Cart</h1>
        <p className={`mt-4 max-w-2xl ${PAGE_LEAD_CLASS}`}>
          Shipping updates instantly as you change quantities. Totals match what
          we store with your order before WhatsApp opens.
        </p>
      </header>
      <CartPageClient />
    </PageContainer>
  );
}
