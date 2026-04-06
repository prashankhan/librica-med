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
    <div className="w-full min-w-0 space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
        {display ? (
          <Image
            src={display}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-gray-400">
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
              className={`relative size-14 shrink-0 overflow-hidden rounded-lg border transition duration-200 ease-out sm:size-16 ${
                display === url
                  ? "border-[#037eff] ring-2 ring-[#037eff]/25"
                  : "border-gray-100 hover:border-[#037eff]/40"
              }`}
              aria-label="View image"
            >
              <Image
                src={url}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
