"use client";

import { useState } from "react";
import type { Book } from "@/types/book";
import { useCartStore } from "@/stores/cart-store";
import { formatLkr, formatWeightGrams } from "@/lib/format";
import { Button } from "@/components/ui/button";

interface BookDetailActionsProps {
  book: Book;
}

export function BookDetailActions({ book }: BookDetailActionsProps) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-3xl font-semibold tracking-tight text-[#001f40]">
          {formatLkr(book.price_lkr)}
        </p>
        <p className="mt-2 text-sm text-[#001f40]/55">
          Weight: {formatWeightGrams(book.weight_grams)} · Islandwide shipping
          calculated at checkout
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="px-4 py-2.5 text-sm hover:bg-neutral-50 rounded-l-full"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="min-w-[3rem] text-center text-sm font-semibold tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            className="px-4 py-2.5 text-sm hover:bg-neutral-50 rounded-r-full"
            onClick={() => setQty((q) => q + 1)}
          >
            +
          </button>
        </div>
        <Button
          type="button"
          variant="primary"
          className="min-w-[180px] justify-center"
          onClick={() =>
            addItem({
              id: book.id,
              title: book.title,
              slug: book.slug,
              price_lkr: book.price_lkr,
              weight_grams: book.weight_grams,
              image: book.cover_image,
              quantity: qty,
            })
          }
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
