import type { Metadata } from "next";
import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";
import { PageContainer, SECTION_PAD_Y } from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Enter delivery details for your Librica Med order. We save your order, then open WhatsApp in a new tab with a structured summary.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <PageContainer className={SECTION_PAD_Y}>
      <CheckoutPageClient />
    </PageContainer>
  );
}
