import { AIRTABLE_TABLES, getAirtableConfig } from "@/lib/airtable/env";
import { listAllRecords } from "@/lib/airtable/client";
import { mapAirtableShippingRule } from "@/lib/airtable/mappers";
import type { ShippingRule } from "@/types/shipping";
import { MOCK_SHIPPING_RULES } from "@/lib/mock-data";

export async function fetchShippingRulesFromAirtable(): Promise<ShippingRule[]> {
  const cfg = getAirtableConfig();
  if (!cfg) return [];

  const records = await listAllRecords<Record<string, unknown>>(
    encodeURIComponent(AIRTABLE_TABLES.shipping_rules),
  );

  const rules: ShippingRule[] = [];
  for (const r of records) {
    const row = mapAirtableShippingRule({
      id: r.id,
      fields: r.fields as Parameters<typeof mapAirtableShippingRule>[0]["fields"],
    });
    if (row) rules.push(row);
  }
  return rules;
}

export async function getShippingRules(): Promise<ShippingRule[]> {
  const live = await fetchShippingRulesFromAirtable();
  if (live.length > 0) return live;
  return MOCK_SHIPPING_RULES;
}
