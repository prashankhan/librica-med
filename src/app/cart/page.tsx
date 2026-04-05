import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/cart-page-client";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review your medical books, quantities, and islandwide shipping before checkout at Librica Med.",
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-[#001f40]">
        Cart
      </h1>
      <p className="mt-2 max-w-xl text-sm text-[#001f40]/55">
        Shipping updates instantly as you change quantities. Totals match what
        we store with your order before WhatsApp opens.
      </p>
      <div className="mt-10">
        <CartPageClient />
      </div>
    </div>
  );
}
