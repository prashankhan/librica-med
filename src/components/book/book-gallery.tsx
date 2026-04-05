"use client";

import Image from "next/image";
import { useState } from "react";

interface BookGalleryProps {
  coverUrl: string | null;
  galleryUrls: string[];
  title: string;
}

export function BookGallery({
  coverUrl,
  galleryUrls,
  title,
}: BookGalleryProps) {
  const primary = coverUrl ?? galleryUrls[0] ?? null;
  const thumbs = [
    ...(coverUrl ? [coverUrl] : []),
    ...galleryUrls.filter((u) => u !== coverUrl),
  ];
  const [active, setActive] = useState(primary);

  const display = active ?? primary;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[2/3] w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200/90 bg-neutral-50">
        {display ? (
          <Image
            src={display}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-[#001f40]/45">
            Cover coming soon
          </div>
        )}
      </div>
      {thumbs.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {thumbs.map((url) => (
            <button
              key={url}
              type="button"
              onClick={() => setActive(url)}
              className={`relative h-16 w-12 overflow-hidden rounded-lg border transition-colors ${
                display === url
                  ? "border-[#037eff] ring-2 ring-[#037eff]/25"
                  : "border-neutral-200 hover:border-[#037eff]/40"
              }`}
              aria-label="View image"
            >
              <Image
                src={url}
                alt=""
                fill
                className="object-cover"
                sizes="48px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
