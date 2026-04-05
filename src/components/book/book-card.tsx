import Link from "next/link";
import type { Book } from "@/types/book";
import { BookCover } from "@/components/book/book-cover";
import { formatLkr } from "@/lib/format";
import { AddToCartButton } from "@/components/book/add-to-cart-button";

interface BookCardProps {
  book: Book;
  priorityImage?: boolean;
}

export function BookCard({ book, priorityImage = false }: BookCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl border border-neutral-200/90 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/books/${book.slug}`} className="block">
        <BookCover
          src={book.cover_image}
          alt={book.title}
          priority={priorityImage}
        />
        <h2 className="mt-3 line-clamp-2 text-sm font-semibold tracking-tight text-[#001f40] group-hover:text-[#037eff] transition-colors">
          {book.title}
        </h2>
        <p className="mt-1 text-sm font-medium text-[#001f40]/70">
          {formatLkr(book.price_lkr)}
        </p>
      </Link>
      <div className="mt-3">
        <AddToCartButton book={book} className="w-full" />
      </div>
    </article>
  );
}
