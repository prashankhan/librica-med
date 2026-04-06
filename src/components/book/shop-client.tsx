"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Book } from "@/types/book";
import { formatLkr } from "@/lib/format";
import { BookCard } from "@/components/book/book-card";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/layout/page-container";

const shopControlLabelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500";

const shopControlClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base font-medium text-[#001f40] placeholder:text-gray-400 transition duration-200 ease-out focus:border-[#037eff] focus:outline-none focus:ring-2 focus:ring-[#037eff]/20";

interface ShopClientProps {
  books: Book[];
}

const PAGE_SIZE = 12;

type SortKey = "default" | "price-asc" | "price-desc" | "title-asc" | "title-desc";

export function ShopClient({ books }: ShopClientProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("default");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function resetVisibleCount() {
    setVisibleCount(PAGE_SIZE);
  }

  const bounds = useMemo(() => {
    if (books.length === 0) return { min: 0, max: 0 };
    const prices = books.map((b) => b.price_lkr);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [books]);

  const searched = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;
    return books.filter((b) => b.title.toLowerCase().includes(q));
  }, [books, query]);

  const priceFiltered = useMemo(() => {
    const minN = priceMin.trim() === "" ? null : Number(priceMin);
    const maxN = priceMax.trim() === "" ? null : Number(priceMax);
    return searched.filter((b) => {
      if (minN != null && !Number.isNaN(minN) && b.price_lkr < minN) return false;
      if (maxN != null && !Number.isNaN(maxN) && b.price_lkr > maxN) return false;
      return true;
    });
  }, [searched, priceMin, priceMax]);

  const sorted = useMemo(() => {
    if (sort === "default") return priceFiltered;
    const copy = [...priceFiltered];
    switch (sort) {
      case "price-asc":
        copy.sort((a, b) => a.price_lkr - b.price_lkr);
        break;
      case "price-desc":
        copy.sort((a, b) => b.price_lkr - a.price_lkr);
        break;
      case "title-asc":
        copy.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
        break;
      case "title-desc":
        copy.sort((a, b) => b.title.localeCompare(a.title, undefined, { sensitivity: "base" }));
        break;
      default:
        break;
    }
    return copy;
  }, [priceFiltered, sort]);

  const visible = sorted.slice(0, visibleCount);
  const hasMore = sorted.length > visibleCount;

  const hasActiveFilters =
    sort !== "default" || priceMin.trim() !== "" || priceMax.trim() !== "";

  return (
    <div>
      <div className="sticky top-[90px] z-40 -mx-4 mb-8 border-b border-gray-100/80 bg-[var(--background)] px-4 py-4 sm:-mx-5 sm:px-5 sm:py-5 md:py-6 lg:-mx-6 lg:px-6">
        <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-end lg:gap-6 xl:gap-8">
          <div className="min-w-0 flex-1">
            <label htmlFor="shop-search" className={shopControlLabelClass}>
              Search by title
            </label>
            <div className="max-md:grid max-md:grid-cols-[minmax(0,1fr)_3rem] max-md:items-stretch max-md:gap-2 md:block">
              <div className="relative min-w-0">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#037eff]/70"
                  aria-hidden
                  strokeWidth={2}
                />
                <input
                  id="shop-search"
                  type="search"
                  placeholder="Type a book name…"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    resetVisibleCount();
                  }}
                  autoComplete="off"
                  className={`${shopControlClass} w-full pl-12 max-md:min-h-12 max-md:py-3.5`}
                />
              </div>
              <button
                type="button"
                className="relative flex shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-[#001f40] transition duration-200 ease-out hover:border-[#037eff]/40 hover:bg-[#037eff]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#037eff] max-md:min-h-12 max-md:w-12 md:hidden"
                aria-label={
                  mobileFiltersOpen
                    ? "Close sort and price filters"
                    : "Open sort and price filters"
                }
                aria-expanded={mobileFiltersOpen}
                aria-controls="shop-mobile-filters"
                onClick={() => setMobileFiltersOpen((open) => !open)}
              >
                <SlidersHorizontal
                  className={`h-5 w-5 shrink-0 text-[#037eff] transition-transform duration-200 ${mobileFiltersOpen ? "scale-95" : ""}`}
                  aria-hidden
                  strokeWidth={2}
                />
                {hasActiveFilters ? (
                  <span
                    className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#037eff] ring-2 ring-white"
                    aria-hidden
                  />
                ) : null}
              </button>
            </div>
          </div>

          <div
            id="shop-mobile-filters"
            className={`max-md:border-t max-md:border-gray-100 max-md:pt-4 flex w-full flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-end md:border-t-0 md:pt-0 lg:w-auto lg:max-w-none lg:flex-nowrap xl:gap-6 ${mobileFiltersOpen ? "flex" : "hidden md:flex"}`}
          >
            <div className="min-w-0 w-full sm:min-w-54 sm:flex-1 lg:w-56 lg:flex-initial xl:w-64">
              <label htmlFor="shop-sort" className={shopControlLabelClass}>
                Sort by
              </label>
              <select
                id="shop-sort"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as SortKey);
                  resetVisibleCount();
                }}
                className={shopControlClass}
              >
                <option value="default">Default (catalogue order)</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="title-asc">Title: A–Z</option>
                <option value="title-desc">Title: Z–A</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-1 sm:gap-4 lg:contents">
              <div className="min-w-0 sm:min-w-28 sm:flex-1 lg:w-32 lg:flex-initial">
                <label htmlFor="shop-price-min" className={shopControlLabelClass}>
                  Min (LKR)
                </label>
                <input
                  id="shop-price-min"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  placeholder={bounds.min > 0 ? String(Math.round(bounds.min)) : "0"}
                  value={priceMin}
                  onChange={(e) => {
                    setPriceMin(e.target.value);
                    resetVisibleCount();
                  }}
                  className={shopControlClass}
                />
              </div>
              <div className="min-w-0 sm:min-w-28 sm:flex-1 lg:w-32 lg:flex-initial">
                <label htmlFor="shop-price-max" className={shopControlLabelClass}>
                  Max (LKR)
                </label>
                <input
                  id="shop-price-max"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1}
                  placeholder={bounds.max > 0 ? String(Math.round(bounds.max)) : "—"}
                  value={priceMax}
                  onChange={(e) => {
                    setPriceMax(e.target.value);
                    resetVisibleCount();
                  }}
                  className={shopControlClass}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 px-6 py-16 text-center text-base leading-relaxed text-gray-600">
          No books match your filters. Try adjusting the price range or search.
        </p>
      ) : (
        <>
          <p className="mb-4 text-sm font-medium text-gray-500 md:text-base">
            Showing {visible.length} of {sorted.length}{" "}
            {sorted.length === 1 ? "book" : "books"}
            {bounds.min !== bounds.max ? (
              <span className="text-gray-400">
                {" "}
                · Full catalogue {formatLkr(bounds.min)}–{formatLkr(bounds.max)}
              </span>
            ) : null}
          </p>
          <ProductGrid>
            {visible.map((book, i) => (
              <BookCard key={book.id} book={book} priorityImage={i < 4} />
            ))}
          </ProductGrid>
          {hasMore ? (
            <div className="mt-10 flex justify-center">
              <Button
                type="button"
                variant="outline"
                className="px-8 py-3 text-base font-semibold"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              >
                Load more
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
