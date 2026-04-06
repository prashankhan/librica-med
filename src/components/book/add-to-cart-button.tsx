"use client";

import { ShoppingCart } from "lucide-react";
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
      className={`w-full px-6 py-3 text-base font-semibold tracking-tight shadow-sm transition-shadow duration-200 ease-out hover:shadow-md active:scale-[0.99] ${className}`}
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
      <ShoppingCart className="h-4 w-4 shrink-0 opacity-95" aria-hidden />
      {label}
    </Button>
  );
}
