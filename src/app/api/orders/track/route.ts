import { NextResponse } from "next/server";
import { findOrdersByPhone } from "@/lib/airtable/orders";
import { getAirtableConfig } from "@/lib/airtable/env";
import { normalizePhone } from "@/lib/utils/normalize-phone";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("phone")?.trim() ?? "";

  const normalized = normalizePhone(raw);
  if (!normalized) {
    return NextResponse.json(
      { error: "Enter a valid Sri Lanka mobile number" },
      { status: 400 },
    );
  }

  if (!getAirtableConfig()) {
    return NextResponse.json({ orders: [] });
  }

  try {
    const orders = await findOrdersByPhone(normalized);
    return NextResponse.json({ orders });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not look up orders" },
      { status: 500 },
    );
  }
}
