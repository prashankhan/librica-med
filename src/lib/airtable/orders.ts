import { AIRTABLE_TABLES, getAirtableConfig } from "@/lib/airtable/env";
import { airtableFetch, listAllRecords } from "@/lib/airtable/client";
import { mapAirtableOrder } from "@/lib/airtable/mappers";
import type { OrderRecord } from "@/types/order";

function escapeFormulaString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export async function createOrderRecord(fields: Record<string, unknown>): Promise<{
  id: string;
}> {
  const cfg = getAirtableConfig();
  if (!cfg) {
    throw new Error("Airtable is not configured");
  }

  const table = encodeURIComponent(AIRTABLE_TABLES.orders);
  const res = await airtableFetch(table, {
    method: "POST",
    body: JSON.stringify({ fields }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable create order failed: ${res.status} ${body}`);
  }

  const data = (await res.json()) as { id: string };
  return { id: data.id };
}

/**
 * @param normalizedPhone - Output of `normalizePhone()` (+947XXXXXXXX)
 */
export async function findOrdersByPhone(
  normalizedPhone: string,
): Promise<OrderRecord[]> {
  const cfg = getAirtableConfig();
  if (!cfg) return [];

  if (!normalizedPhone) return [];

  const formula = `{phone_number}="${escapeFormulaString(normalizedPhone)}"`;
  const records = await listAllRecords<Record<string, unknown>>(
    encodeURIComponent(AIRTABLE_TABLES.orders),
    {
      filterByFormula: formula,
    },
  );

  const orders: OrderRecord[] = [];
  for (const r of records) {
    const o = mapAirtableOrder({
      id: r.id,
      createdTime: r.createdTime,
      fields: r.fields as Parameters<typeof mapAirtableOrder>[0]["fields"],
    });
    if (o) orders.push(o);
  }

  orders.sort((a, b) => {
    const ta = Date.parse(a.created_time) || 0;
    const tb = Date.parse(b.created_time) || 0;
    return tb - ta;
  });

  return orders;
}
