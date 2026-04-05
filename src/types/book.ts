export type BookStatus = "active" | "inactive";

export interface Book {
  id: string;
  title: string;
  slug: string;
  description: string;
  price_lkr: number;
  weight_grams: number;
  cover_image: string | null;
  gallery_images: string[];
  status: BookStatus;
  /** When present in Airtable, used for homepage featured section */
  featured?: boolean;
}
