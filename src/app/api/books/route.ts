import { NextResponse } from "next/server";
import { getAllBooks } from "@/lib/airtable/books";

export async function GET() {
  try {
    const books = await getAllBooks();
    return NextResponse.json({ books });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load books" },
      { status: 500 },
    );
  }
}
