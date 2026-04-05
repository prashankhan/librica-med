import type { Metadata } from "next";
import { TrackOrderClient } from "@/components/track-order/track-order-client";

export const metadata: Metadata = {
  title: "Track Order",
  description:
    "Look up your Librica Med orders with the phone number you used at checkout. All matching orders, newest first.",
  alternates: { canonical: "/track-order" },
};

export default function TrackOrderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mx-auto max-w-lg text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-[#001f40]">
          Track your order
        </h1>
        <p className="mt-3 text-sm text-[#001f40]/55">
          Enter your Sri Lanka mobile number in any common format. We match it
          the same way as checkout and list every order for that number,
          newest first.
        </p>
      </header>
      <div className="mt-12">
        <TrackOrderClient />
      </div>
    </div>
  );
}
