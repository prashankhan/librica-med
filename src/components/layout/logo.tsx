import Image from "next/image";
import Link from "next/link";
import { SITE_LOGO_SRC, SITE_NAME } from "@/lib/site-config";

/**
 * Wordmark from `public/logos/Librica Med.svg`. Replace the file there to update branding.
 */
export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#037eff] rounded-sm"
      aria-label={`${SITE_NAME} home`}
    >
      <Image
        src={SITE_LOGO_SRC}
        alt={SITE_NAME}
        width={364}
        height={112}
        className="h-12 w-auto max-h-12 sm:h-14 sm:max-h-14"
        priority
        unoptimized
      />
    </Link>
  );
}
