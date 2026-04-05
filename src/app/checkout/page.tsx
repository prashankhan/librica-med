import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Enter delivery details for your Librica Med order. We save your order first, then open WhatsApp with a structured summary.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-[#001f40]">
        Checkout
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[#001f40]/55">
        No card payment on this site. Submit your details—we record the order
        in our system, then hand you off to WhatsApp with everything itemised.
      </p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
