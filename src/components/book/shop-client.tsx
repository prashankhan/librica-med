"use client";

import { useMemo, useState } from "react";
import type { Book } from "@/types/book";
import { BookCard } from "@/components/book/book-card";

interface ShopClientProps {
  books: Book[];
}

export function ShopClient({ books }: ShopClientProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter((b) => b.title.toLowerCase().includes(q));
  }, [books, query]);

  return (
    <div>
      <div className="mb-10 max-w-md">
        <label htmlFor="shop-search" className="sr-only">
          Search books by title
        </label>
        <input
          id="shop-search"
          type="search"
          placeholder="Search by title…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm text-[#001f40] placeholder:text-neutral-400 focus:border-[#037eff] focus:outline-none focus:ring-2 focus:ring-[#037eff]/20"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-16 text-center text-sm text-[#001f40]/60">
          No books match your search. Try another title or browse our full
          catalogue soon.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((book, i) => (
            <BookCard key={book.id} book={book} priorityImage={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
