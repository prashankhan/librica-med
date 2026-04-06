import type { Metadata } from "next";
import { TrackOrderClient } from "@/components/track-order/track-order-client";
import {
  PAGE_H1_CLASS,
  PAGE_LEAD_CLASS,
  PAGE_READING_MAX_CLASS,
  PageContainer,
  SECTION_PAD_Y,
} from "@/components/layout/page-container";

export const metadata: Metadata = {
  title: "Track Order",
  description:
    "Look up your Librica Med orders with the phone number you used at checkout. All matching orders, newest first.",
  alternates: { canonical: "/track-order" },
};

export default function TrackOrderPage() {
  return (
    <PageContainer className={SECTION_PAD_Y}>
      <div className={PAGE_READING_MAX_CLASS}>
        <header className="mb-8">
          <h1 className={PAGE_H1_CLASS}>Track your order</h1>
          <p className={`mt-4 ${PAGE_LEAD_CLASS}`}>
            Enter your Sri Lanka mobile number in any common format. We match it
            the same way as checkout and list every order for that number,
            newest first.
          </p>
        </header>
        <TrackOrderClient />
      </div>
    </PageContainer>
  );
}
