import { z } from "zod";

export const cartItemPayloadSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  price_lkr: z.number().nonnegative(),
  weight_grams: z.number().nonnegative(),
  image: z.string().nullable().optional(),
  quantity: z.number().int().positive(),
});

export const createOrderBodySchema = z.object({
  customer_name: z.string().trim().min(2).max(120),
  phone_number: z.string().trim().min(8).max(32),
  delivery_address: z.string().trim().min(10).max(2000),
  items: z.array(cartItemPayloadSchema).min(1),
});

export type CreateOrderBody = z.infer<typeof createOrderBodySchema>;
