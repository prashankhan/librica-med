import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#037eff]">
        404
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[#001f40]">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-[#001f40]/60">
        The page may have moved. Try the shop or return home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/shop" variant="primary">
          Shop books
        </ButtonLink>
        <Link
          href="/"
          className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-[#001f40] hover:bg-neutral-100"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
