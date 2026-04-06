"use client";

import { useEffect, useState } from "react";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutThankYou } from "@/components/checkout/checkout-thank-you";
import {
  PAGE_H1_CLASS,
  PAGE_LEAD_CLASS,
} from "@/components/layout/page-container";

interface PlacedOrder {
  orderId: string;
  whatsappUrl: string;
}

export function CheckoutPageClient() {
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    if (!placedOrder) return;
    const previousTitle = document.title;
    document.title = "Thank you — Librica Med";
    return () => {
      document.title = previousTitle;
    };
  }, [placedOrder]);

  if (placedOrder) {
    return (
      <>
        <header className="mb-8">
          <h1 className={PAGE_H1_CLASS}>Thank you</h1>
          <p className={`mt-4 max-w-2xl ${PAGE_LEAD_CLASS}`}>
            Your order is saved. We&apos;ll process it and follow up with you on
            WhatsApp.
          </p>
        </header>
        <CheckoutThankYou
          orderId={placedOrder.orderId}
          whatsappUrl={placedOrder.whatsappUrl}
        />
      </>
    );
  }

  return (
    <>
      <header className="mb-8">
        <h1 className={PAGE_H1_CLASS}>Checkout</h1>
        <p className={`mt-4 max-w-2xl ${PAGE_LEAD_CLASS}`}>
          No card payment on this site. Submit your details—we record the order
          in our system, then open WhatsApp in a new tab with everything
          itemised.
        </p>
      </header>
      <CheckoutForm
        onOrderPlaced={({ orderId, whatsappUrl }) =>
          setPlacedOrder({ orderId, whatsappUrl })
        }
      />
    </>
  );
}
