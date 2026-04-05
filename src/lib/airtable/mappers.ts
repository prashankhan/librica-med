import type { Book, BookStatus } from "@/types/book";
import type { ShippingRule } from "@/types/shipping";
import type { OrderRecord, OrderStatus } from "@/types/order";

/**
 * Airtable field mapping (table: books)
 * - title (Single line text)
 * - slug (Single line text)
 * - description (Long text)
 * - price_lkr (Number)
 * - weight_grams (Number)
 * - cover_image (Attachment or URL text)
 * - gallery_images (Multiple attachments)
 * - status (Single select: active | inactive)
 * - featured (Checkbox, optional — homepage featured grid)
 */
interface AirtableBookFields {
  title?: string;
  slug?: string;
  description?: string;
  price_lkr?: number;
  weight_grams?: number;
  cover_image?: unknown;
  gallery_images?: unknown;
  status?: string;
  featured?: boolean;
}

/**
 * shipping_rules
 * - min_weight_grams (Number)
 * - max_weight_grams (Number, empty = open-ended top bracket)
 * - price_lkr (Number)
 */
interface AirtableShippingFields {
  min_weight_grams?: number;
  max_weight_grams?: number | null;
  price_lkr?: number;
}

/**
 * orders
 * - order_id, customer_name, phone_number, delivery_address (text)
 * - cart_items_json (Long text)
 * - items_summary (Long text)
 * - total_weight_grams, books_total_lkr, shipping_cost_lkr, grand_total_lkr (Number)
 * - order_status (Single select)
 * - created_at (optional manual ISO; display uses API `createdTime` when present)
 */
interface AirtableOrderFields {
  order_id?: string;
  customer_name?: string;
  phone_number?: string;
  delivery_address?: string;
  items_summary?: string;
  total_weight_grams?: number;
  books_total_lkr?: number;
  shipping_cost_lkr?: number;
  grand_total_lkr?: number;
  order_status?: string;
  created_at?: string;
}

function attachmentUrls(value: unknown): string[] {
  if (!value) return [];
  if (typeof value === "string" && value.startsWith("http")) return [value];
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (item && typeof item === "object" && "url" in item)
        return String((item as { url: string }).url);
      return "";
    })
    .filter(Boolean);
}

function firstImageUrl(value: unknown): string | null {
  const urls = attachmentUrls(value);
  return urls[0] ?? null;
}

export function mapAirtableBook(record: {
  id: string;
  fields: AirtableBookFields;
}): Book | null {
  const f = record.fields;
  const title = f.title?.trim();
  const slug = f.slug?.trim();
  if (!title || !slug) return null;

  const statusRaw = (f.status ?? "active").toLowerCase();
  const status: BookStatus =
    statusRaw === "inactive" ? "inactive" : "active";

  const cover = firstImageUrl(f.cover_image);
  const gallery = attachmentUrls(f.gallery_images);

  return {
    id: record.id,
    title,
    slug,
    description: f.description?.trim() ?? "",
    price_lkr: Number(f.price_lkr ?? 0),
    weight_grams: Math.max(0, Math.round(Number(f.weight_grams ?? 0))),
    cover_image: cover,
    gallery_images: gallery,
    status,
    featured: Boolean(f.featured),
  };
}

export function mapAirtableShippingRule(record: {
  id: string;
  fields: AirtableShippingFields;
}): ShippingRule | null {
  const f = record.fields;
  const min = Math.round(Number(f.min_weight_grams ?? 0));
  const maxRaw = f.max_weight_grams;
  const max =
    maxRaw === undefined || maxRaw === null
      ? null
      : Math.round(Number(maxRaw));
  const price = Math.round(Number(f.price_lkr ?? 0));
  if (Number.isNaN(min) || Number.isNaN(price)) return null;
  return {
    id: record.id,
    min_weight_grams: min,
    max_weight_grams: max,
    price_lkr: price,
  };
}

const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "packed",
  "completed",
  "cancelled",
];

function parseOrderStatus(value: string | undefined): OrderStatus {
  const v = (value ?? "pending").toLowerCase();
  if (ORDER_STATUSES.includes(v as OrderStatus)) return v as OrderStatus;
  return "pending";
}

export function mapAirtableOrder(record: {
  id: string;
  createdTime?: string;
  fields: AirtableOrderFields;
}): OrderRecord | null {
  const f = record.fields;
  const orderId = f.order_id?.trim();
  if (!orderId) return null;

  const createdTime =
    record.createdTime?.trim() || f.created_at?.trim() || "";

  return {
    id: record.id,
    order_id: orderId,
    customer_name: f.customer_name?.trim() ?? "",
    phone_number: f.phone_number?.trim() ?? "",
    delivery_address: f.delivery_address?.trim() ?? "",
    items_summary: f.items_summary?.trim() ?? "",
    total_weight_grams: Math.round(Number(f.total_weight_grams ?? 0)),
    books_total_lkr: Number(f.books_total_lkr ?? 0),
    shipping_cost_lkr: Number(f.shipping_cost_lkr ?? 0),
    grand_total_lkr: Number(f.grand_total_lkr ?? 0),
    order_status: parseOrderStatus(f.order_status),
    created_time: createdTime,
  };
}
