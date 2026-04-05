import { getAirtableConfig } from "@/lib/airtable/env";

export interface AirtableRecord<TFields> {
  id: string;
  /** Airtable system timestamp for the record (preferred for order display/sort). */
  createdTime?: string;
  fields: TFields;
}

export interface AirtableListResponse<TFields> {
  records: AirtableRecord<TFields>[];
  offset?: string;
}

export async function airtableFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const cfg = getAirtableConfig();
  if (!cfg) {
    throw new Error("Airtable is not configured");
  }

  const url = `https://api.airtable.com/v0/${cfg.baseId}/${path}`;
  const isGet = (init?.method ?? "GET").toUpperCase() === "GET";

  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...(isGet ? { next: { revalidate: 60 } } : { cache: "no-store" }),
  });
}

export async function listAllRecords<TFields>(
  tablePath: string,
  params: Record<string, string> = {},
): Promise<AirtableRecord<TFields>[]> {
  const records: AirtableRecord<TFields>[] = [];
  let offset: string | undefined;

  do {
    const search = new URLSearchParams(params);
    if (offset) search.set("offset", offset);
    const qs = search.toString();
    const path = `${tablePath}${qs ? `?${qs}` : ""}`;
    const res = await airtableFetch(path);
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Airtable ${res.status}: ${body}`);
    }
    const data = (await res.json()) as AirtableListResponse<TFields>;
    records.push(...data.records);
    offset = data.offset;
  } while (offset);

  return records;
}
