import type { ReactNode } from "react";

/** Sitewide horizontal padding: mobile / tablet / desktop */
export const PAGE_PAD_X = "px-4 sm:px-5 lg:px-6";

/** Section vertical rhythm: mobile / tablet / desktop */
export const SECTION_PAD_Y = "py-10 md:py-12 lg:py-14";

/** Main page title (H1) — aligns with homepage scale (Featured / Delivery use section title below) */
export const PAGE_H1_CLASS =
  "text-3xl font-bold tracking-tight text-[#001f40] sm:text-4xl md:text-5xl";

/** Intro / lead paragraph under H1 */
export const PAGE_LEAD_CLASS =
  "text-base font-medium leading-relaxed text-gray-600 md:text-lg";

/** Secondary line under H1 (e.g. last updated, registration) */
export const PAGE_META_LINE_CLASS =
  "text-base font-medium text-gray-500 md:text-lg";

/** Uppercase field label (contact blocks, forms) */
export const PAGE_FIELD_LABEL_CLASS =
  "text-xs font-semibold uppercase tracking-wider text-gray-500";

/** Wide content column (cart grid, checkout form) — full tablet width */
export const PAGE_PROSE_MAX_CLASS = "mx-auto w-full min-w-0 max-w-3xl";

/**
 * Inner content column for About, Contact, Delivery, legal, Track order, etc.
 * Wider than `max-w-prose` (~65ch) so forms and tables breathe; capped at 48rem.
 */
export const PAGE_READING_MAX_CLASS = "mx-auto w-full min-w-0 max-w-3xl";

/** In-page section title (H2) — matches “Featured books” / “Delivery & shipping” */
export const PAGE_SECTION_TITLE_CLASS =
  "text-2xl font-bold tracking-tight text-[#001f40] md:text-3xl";

/** Primary pill CTA — matches homepage hero buttons */
export const PAGE_PRIMARY_CTA_CLASS =
  "px-8! py-4! text-lg! font-bold! tracking-tight";

/** Panel / sidebar title (cart summary, checkout summary) */
export const PANEL_TITLE_CLASS =
  "text-base font-bold tracking-tight text-[#001f40] md:text-lg";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div
      className={`mx-auto max-w-7xl ${PAGE_PAD_X} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

interface ProductGridProps {
  children: ReactNode;
  className?: string;
}

export function ProductGrid({ children, className = "" }: ProductGridProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4 lg:gap-8 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
