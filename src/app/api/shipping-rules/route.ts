import { NextResponse } from "next/server";
import { getShippingRules } from "@/lib/airtable/shipping-rules";

export async function GET() {
  try {
    const rules = await getShippingRules();
    return NextResponse.json({ rules });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load shipping rules" },
      { status: 500 },
    );
  }
}
