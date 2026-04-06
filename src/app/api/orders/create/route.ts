import { NextResponse } from "next/server";
import { createOrderBodySchema } from "@/lib/validation/order";
import { getShippingRules } from "@/lib/airtable/shipping-rules";
import { getShippingFeeLkr, sumCartWeightGrams } from "@/lib/shipping";
import { getAirtableConfig } from "@/lib/airtable/env";
import { createOrderRecord } from "@/lib/airtable/orders";
import { generateOrderId, buildItemsSummary } from "@/lib/order-utils";
import {
  buildOrderWhatsAppMessage,
  buildWhatsAppOrderUrl,
} from "@/lib/whatsapp";
import type { CartItem } from "@/types/cart";
import { normalizePhone } from "@/lib/utils/normalize-phone";

export async function POST(request: Request) {
  if (!getAirtableConfig()) {
    return NextResponse.json(
      {
        error:
          "Orders are not available until Airtable is configured. Add AIRTABLE_PAT and AIRTABLE_BASE_ID.",
      },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createOrderBodySchema.safeParse(json);
  if (!parsed.success) {
    const message = parsed.error.issues
      .map((issue) => issue.message)
      .filter(Boolean)
      .join(" • ");
    return NextResponse.json(
      {
        error:
          message ||
          "Something in the form could not be validated. Please check your details.",
      },
      { status: 422 },
    );
  }

  const body = parsed.data;

  const normalizedPhone = normalizePhone(body.phone_number);
  if (!normalizedPhone) {
    return NextResponse.json(
      {
        error:
          "That phone number doesn't look like a Sri Lanka mobile. Use 07XXXXXXXX or +94 7X XXX XXXX (9 digits after the leading 7).",
      },
      { status: 422 },
    );
  }

  const items: CartItem[] = body.items.map((i) => ({
    id: i.id,
    title: i.title,
    slug: i.slug,
    price_lkr: i.price_lkr,
    weight_grams: i.weight_grams,
    image: i.image ?? null,
    quantity: i.quantity,
  }));

  const booksSubtotal = items.reduce(
    (s, i) => s + i.price_lkr * i.quantity,
    0,
  );
  const totalWeight = sumCartWeightGrams(items);

  let shipping: number;
  try {
    const rules = await getShippingRules();
    shipping = getShippingFeeLkr(totalWeight, rules);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not calculate shipping" },
      { status: 500 },
    );
  }

  const grandTotal = booksSubtotal + shipping;
  const orderId = generateOrderId();
  const itemsSummary = buildItemsSummary(items);
  const cartJson = JSON.stringify(items);
  const createdAt = new Date().toISOString();

  const fields = {
    order_id: orderId,
    customer_name: body.customer_name,
    phone_number: normalizedPhone,
    delivery_address: body.delivery_address,
    cart_items_json: cartJson,
    items_summary: itemsSummary,
    total_weight_grams: totalWeight,
    books_total_lkr: booksSubtotal,
    shipping_cost_lkr: shipping,
    grand_total_lkr: grandTotal,
    order_status: "pending",
    created_at: createdAt,
  };

  try {
    await createOrderRecord(fields);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not save your order. Please try again or WhatsApp us." },
      { status: 502 },
    );
  }

  const message = buildOrderWhatsAppMessage({
    items,
    booksSubtotalLkr: booksSubtotal,
    totalWeightGrams: totalWeight,
    shippingLkr: shipping,
    grandTotalLkr: grandTotal,
    customerName: body.customer_name,
    phone: normalizedPhone,
    address: body.delivery_address,
  });

  const whatsappUrl = buildWhatsAppOrderUrl(message);

  return NextResponse.json({
    ok: true,
    order_id: orderId,
    whatsapp_url: whatsappUrl,
    totals: {
      books_subtotal_lkr: booksSubtotal,
      total_weight_grams: totalWeight,
      shipping_lkr: shipping,
      grand_total_lkr: grandTotal,
    },
  });
}
