import Image from "next/image";

interface BookCoverProps {
  src: string | null;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export function BookCover({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 200px",
  className = "",
}: BookCoverProps) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-neutral-200/80 bg-neutral-50 aspect-[2/3] ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#037eff]/80">
            Librica Med
          </span>
          <span className="text-xs font-medium leading-snug text-[#001f40]/50 line-clamp-4">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
}
