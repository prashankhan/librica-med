"use client";

import { useEffect, useState } from "react";
import type { Book } from "@/types/book";
import { useCartStore } from "@/stores/cart-store";
import { Button, ButtonLink } from "@/components/ui/button";
import { PAGE_PRIMARY_CTA_CLASS } from "@/components/layout/page-container";

interface BookDetailActionsProps {
  book: Book;
}

export function BookDetailActions({ book }: BookDetailActionsProps) {
  const [qty, setQty] = useState(1);
  const [showAddedNotice, setShowAddedNotice] = useState(false);
  const [showNextSteps, setShowNextSteps] = useState(false);
  const [noticeTick, setNoticeTick] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (noticeTick === 0) return;
    const id = window.setTimeout(() => setShowAddedNotice(false), 4500);
    return () => window.clearTimeout(id);
  }, [noticeTick]);

  function handleAddToCart() {
    addItem({
      id: book.id,
      title: book.title,
      slug: book.slug,
      price_lkr: book.price_lkr,
      weight_grams: book.weight_grams,
      image: book.cover_image,
      quantity: qty,
    });
    setShowNextSteps(true);
    setShowAddedNotice(true);
    setNoticeTick((n) => n + 1);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex items-center rounded-full border border-gray-200 bg-white">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="rounded-l-full px-4 py-3 text-base text-[#001f40] transition duration-200 ease-out hover:bg-gray-50"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="min-w-12 text-center text-base font-semibold tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            className="rounded-r-full px-4 py-3 text-base text-[#001f40] transition duration-200 ease-out hover:bg-gray-50"
            onClick={() => setQty((q) => q + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {showAddedNotice ? (
          <p
            role="status"
            aria-live="polite"
            className="text-sm font-medium text-[#001f40]"
          >
            <span className="font-semibold text-[#037eff]">Added</span>
            {" — "}
            This book is in your cart. You can keep shopping or go to checkout.
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch">
          <Button
            type="button"
            variant="primary"
            className={`w-full justify-center sm:w-auto sm:min-w-[200px] sm:flex-1 ${PAGE_PRIMARY_CTA_CLASS}`}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
          {showNextSteps ? (
            <>
              <ButtonLink
                href="/cart"
                variant="outline"
                className="w-full justify-center px-6 py-3 text-base font-semibold tracking-tight sm:w-auto sm:shrink-0"
              >
                View cart
              </ButtonLink>
              <ButtonLink
                href="/checkout"
                variant="outline"
                className="w-full justify-center px-6 py-3 text-base font-semibold tracking-tight sm:w-auto sm:shrink-0"
              >
                Checkout now
              </ButtonLink>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
