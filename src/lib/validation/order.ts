import { z } from "zod";

export const cartItemPayloadSchema = z.object({
  id: z.string().min(1, "Each cart item needs an id."),
  title: z.string().min(1, "Each cart item needs a title."),
  slug: z.string().min(1, "Each cart item needs a slug."),
  price_lkr: z.number().nonnegative("Item price cannot be negative."),
  weight_grams: z.number().nonnegative("Item weight cannot be negative."),
  image: z.string().nullable().optional(),
  quantity: z
    .number()
    .int("Quantity must be a whole number.")
    .positive("Quantity must be at least 1."),
});

export const createOrderBodySchema = z.object({
  customer_name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(120, "Full name is too long (max 120 characters)."),
  phone_number: z
    .string()
    .trim()
    .min(8, "Phone number looks too short.")
    .max(32, "Phone number is too long."),
  delivery_address: z
    .string()
    .trim()
    .min(
      10,
      "Delivery address must be at least 10 characters—include street, area, and landmarks.",
    )
    .max(2000, "Delivery address is too long."),
  items: z
    .array(cartItemPayloadSchema)
    .min(1, "Your cart is empty. Add books before checkout."),
});

export type CreateOrderBody = z.infer<typeof createOrderBodySchema>;
