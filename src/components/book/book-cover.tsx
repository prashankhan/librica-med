import Image from "next/image";

interface BookCoverProps {
  src: string | null;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Width:height box for the frame. Default 2/3 (tall book). Use 3/4 for shorter grid thumbnails. */
  aspectClassName?: string;
}

export function BookCover({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw",
  className = "",
  aspectClassName = "aspect-[2/3]",
}: BookCoverProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border border-gray-100 bg-gray-50 ${aspectClassName} ${className}`.trim()}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition duration-200 ease-out group-hover:scale-[1.02]"
          sizes={sizes}
          priority={priority}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#037eff]/80">
            Librica Med
          </span>
          <span className="line-clamp-4 text-xs font-medium leading-snug text-gray-400">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
