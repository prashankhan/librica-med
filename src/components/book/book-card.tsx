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
    <article className="group flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-3 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-sm md:p-4">
      <Link href={`/books/${book.slug}`} className="block">
        <BookCover
          src={book.cover_image}
          alt={book.title}
          priority={priorityImage}
          aspectClassName="aspect-[3/4]"
        />
        <h2 className="mt-3 line-clamp-2 text-base font-medium tracking-tight text-[#001f40] transition-colors duration-200 ease-out group-hover:text-[#037eff] md:text-lg">
          {book.title}
        </h2>
        <p className="mt-1 text-lg font-semibold text-[#037eff]">
          {formatLkr(book.price_lkr)}
        </p>
      </Link>
      <div className="mt-auto">
        <AddToCartButton book={book} />
      </div>
    </article>
  );
}
