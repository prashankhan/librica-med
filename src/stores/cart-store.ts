"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const qty = Math.max(1, Math.floor(item.quantity ?? 1));
        const { items } = get();
        const existing = items.find((i) => i.id === item.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + qty }
                : i,
            ),
          });
          return;
        }
        set({
          items: [
            ...items,
            {
              id: item.id,
              title: item.title,
              slug: item.slug,
              price_lkr: item.price_lkr,
              weight_grams: item.weight_grams,
              image: item.image,
              quantity: qty,
            },
          ],
        });
      },
      setQuantity: (id, quantity) => {
        const q = Math.max(1, Math.floor(quantity));
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: q } : i,
          ),
        });
      },
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: "librica-med-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
