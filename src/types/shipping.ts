export interface ShippingRule {
  id: string;
  min_weight_grams: number;
  max_weight_grams: number | null;
  price_lkr: number;
}
