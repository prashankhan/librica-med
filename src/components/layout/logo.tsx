import Link from "next/link";

/**
 * Text wordmark placeholder. To use a vector logo, add `public/logo.svg` and
 * replace this block with e.g.:
 *   import Image from "next/image";
 *   <Link href="/"><Image src="/logo.svg" alt="Librica Med" width={140} height={36} className="h-8 w-auto" priority /></Link>
 */
export function Logo() {
  return (
    <Link
      href="/"
      className="font-semibold text-lg tracking-tight text-[#001f40] hover:text-[#037eff] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#037eff] rounded-sm"
      aria-label="Librica Med home"
    >
      LIBRICA MED
    </Link>
  );
}
