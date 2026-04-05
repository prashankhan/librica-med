export type OrderStatus =
  | "pending"
  | "confirmed"
  | "packed"
  | "completed"
  | "cancelled";

export interface OrderRecord {
  id: string;
  order_id: string;
  customer_name: string;
  phone_number: string;
  delivery_address: string;
  items_summary: string;
  total_weight_grams: number;
  books_total_lkr: number;
  shipping_cost_lkr: number;
  grand_total_lkr: number;
  order_status: OrderStatus;
  /** ISO timestamp: Airtable record `createdTime`, fallback to `created_at` field */
  created_time: string;
}
