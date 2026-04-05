import { SITE_NAME, SITE_URL, WHATSAPP_DISPLAY } from "@/lib/site-config";
import type { Book } from "@/types/book";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Sri Lanka’s first registered online medical book shop with islandwide delivery.",
    telephone: WHATSAPP_DISPLAY.replace(/\s/g, ""),
    sameAs: [SITE_URL],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface ProductJsonLdProps {
  book: Book;
  url: string;
}

export function ProductJsonLd({ book, url }: ProductJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: book.title,
    description: book.description || book.title,
    image: book.cover_image ? [book.cover_image, ...book.gallery_images] : [],
    sku: book.id,
    url,
    offers: {
      "@type": "Offer",
      priceCurrency: "LKR",
      price: book.price_lkr,
      availability: "https://schema.org/InStock",
      url,
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    weight: {
      "@type": "QuantitativeValue",
      value: book.weight_grams,
      unitCode: "GRM",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
