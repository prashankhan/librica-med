"use client";

import type { Book } from "@/types/book";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  book: Book;
  quantity?: number;
  className?: string;
  label?: string;
}

export function AddToCartButton({
  book,
  quantity = 1,
  className = "",
  label = "Add to cart",
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Button
      type="button"
      variant="primary"
      className={`text-sm ${className}`}
      onClick={() =>
        addItem({
          id: book.id,
          title: book.title,
          slug: book.slug,
          price_lkr: book.price_lkr,
          weight_grams: book.weight_grams,
          image: book.cover_image,
          quantity,
        })
      }
    >
      {label}
    </Button>
  );
}
