export interface CartItem {
  /** Airtable record id */
  id: string;
  title: string;
  slug: string;
  price_lkr: number;
  weight_grams: number;
  image: string | null;
  quantity: number;
}
