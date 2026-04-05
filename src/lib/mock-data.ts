import type { Book } from "@/types/book";
import type { ShippingRule } from "@/types/shipping";

/**
 * Fallback when Airtable env is not configured or API fails.
 * Replace with live data in Airtable for production.
 */
export const MOCK_BOOKS: Book[] = [
  {
    id: "mock-1",
    title: "Gray’s Anatomy for Students",
    slug: "grays-anatomy-for-students",
    description:
      "A student-focused presentation of clinically relevant anatomy with clear illustrations and clinical correlations.",
    price_lkr: 18500,
    weight_grams: 2100,
    cover_image: null,
    gallery_images: [],
    status: "active",
    featured: true,
  },
  {
    id: "mock-2",
    title: "Kumar & Clark’s Clinical Medicine",
    slug: "kumar-clarks-clinical-medicine",
    description:
      "Comprehensive internal medicine reference trusted by students and clinicians worldwide.",
    price_lkr: 22400,
    weight_grams: 2800,
    cover_image: null,
    gallery_images: [],
    status: "active",
    featured: true,
  },
  {
    id: "mock-3",
    title: "Pharmacology for Health Professionals",
    slug: "pharmacology-for-health-professionals",
    description:
      "Essential pharmacology concepts for nursing, pharmacy, and allied health programmes.",
    price_lkr: 12900,
    weight_grams: 950,
    cover_image: null,
    gallery_images: [],
    status: "active",
    featured: true,
  },
];

/** Matches the shipping slabs from the product brief (grams, LKR). */
export const MOCK_SHIPPING_RULES: ShippingRule[] = [
  { id: "mock-s1", min_weight_grams: 0, max_weight_grams: 5000, price_lkr: 1250 },
  { id: "mock-s2", min_weight_grams: 5001, max_weight_grams: 7500, price_lkr: 1500 },
  { id: "mock-s3", min_weight_grams: 7501, max_weight_grams: 10000, price_lkr: 1700 },
  { id: "mock-s4", min_weight_grams: 10001, max_weight_grams: 12500, price_lkr: 1850 },
  { id: "mock-s5", min_weight_grams: 12501, max_weight_grams: 15000, price_lkr: 1950 },
  { id: "mock-s6", min_weight_grams: 15001, max_weight_grams: 17500, price_lkr: 2100 },
  { id: "mock-s7", min_weight_grams: 17501, max_weight_grams: 20000, price_lkr: 2250 },
  { id: "mock-s8", min_weight_grams: 20001, max_weight_grams: null, price_lkr: 2350 },
];
