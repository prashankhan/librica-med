import { AIRTABLE_TABLES } from "@/lib/airtable/env";
import { listAllRecords } from "@/lib/airtable/client";
import { mapAirtableBook } from "@/lib/airtable/mappers";
import type { Book } from "@/types/book";
import { MOCK_BOOKS } from "@/lib/mock-data";
import { getAirtableConfig } from "@/lib/airtable/env";

export async function fetchBooksFromAirtable(): Promise<Book[]> {
  const cfg = getAirtableConfig();
  if (!cfg) return [];

  const records = await listAllRecords<Record<string, unknown>>(
    encodeURIComponent(AIRTABLE_TABLES.books),
    {
      filterByFormula: `{status}="active"`,
    },
  );

  const books: Book[] = [];
  for (const r of records) {
    const b = mapAirtableBook({
      id: r.id,
      fields: r.fields as Parameters<typeof mapAirtableBook>[0]["fields"],
    });
    if (b) books.push(b);
  }
  return books;
}

export async function getAllBooks(): Promise<Book[]> {
  const live = await fetchBooksFromAirtable();
  if (live.length > 0) return live;
  return MOCK_BOOKS.filter((b) => b.status === "active");
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const cfg = getAirtableConfig();
  if (!cfg) {
    return (
      MOCK_BOOKS.find((b) => b.slug === slug && b.status === "active") ?? null
    );
  }

  const safeSlug = slug.replace(/"/g, '\\"');
  const records = await listAllRecords<Record<string, unknown>>(
    encodeURIComponent(AIRTABLE_TABLES.books),
    {
      filterByFormula: `AND({slug}="${safeSlug}",{status}="active")`,
      maxRecords: "1",
    },
  );

  const first = records[0];
  if (!first) {
    return (
      MOCK_BOOKS.find((b) => b.slug === slug && b.status === "active") ?? null
    );
  }

  return mapAirtableBook({
    id: first.id,
    fields: first.fields as Parameters<typeof mapAirtableBook>[0]["fields"],
  });
}

export function getFeaturedBooks(books: Book[]): Book[] {
  const flagged = books.filter((b) => b.featured);
  if (flagged.length > 0) return flagged.slice(0, 8);
  return books.slice(0, 6);
}
