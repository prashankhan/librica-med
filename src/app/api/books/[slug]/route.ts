import { NextResponse } from "next/server";
import { getBookBySlug } from "@/lib/airtable/books";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  try {
    const book = await getBookBySlug(decodeURIComponent(slug));
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    return NextResponse.json({ book });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load book" },
      { status: 500 },
    );
  }
}
