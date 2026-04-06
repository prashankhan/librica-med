"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { useCartStore } from "@/stores/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { TRUST_TAGLINE, WHATSAPP_WA_ME } from "@/lib/site-config";
import { PAGE_PAD_X } from "@/components/layout/page-container";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/delivery", label: "Delivery Info" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/track-order", label: "Track Order" },
];

export function SiteHeader() {
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = useCartStore((s) => s.items);
  const count = mounted
    ? items.reduce((n, i) => n + i.quantity, 0)
    : 0;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <p
        className={`bg-[#037eff] py-2 text-center text-base font-medium tracking-tight text-white ${PAGE_PAD_X}`}
      >
        {TRUST_TAGLINE}
      </p>

      <header
        className={`sticky top-0 z-50 border-b-2 bg-white transition-colors duration-200 ease-out ${
          scrolled ? "border-gray-200/40" : "border-gray-200/25"
        }`}
      >
        <div
          className={`mx-auto flex h-[90px] max-w-7xl items-center justify-between gap-3 sm:gap-6 ${PAGE_PAD_X}`}
        >
        <Logo />

        <nav
          className="hidden items-center gap-6 lg:gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative text-xl font-semibold tracking-tight text-gray-600 transition-colors duration-200 ease-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-[#037eff] after:transition-transform after:duration-200 after:ease-out hover:text-[#001f40] hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#037eff]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={WHATSAPP_WA_ME}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#25D366]/35 bg-[#25D366]/10 text-[#25D366] transition duration-200 ease-out hover:bg-[#25D366]/20 hover:border-[#25D366]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
            aria-label="Contact on WhatsApp"
          >
            <WhatsAppIcon className="h-8 w-8" />
          </a>

          <Link
            href="/cart"
            className="relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 text-[#001f40] transition duration-200 ease-out hover:border-[#037eff]/30 hover:text-[#037eff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#037eff]"
            aria-label={`Shopping cart${mounted && count > 0 ? `, ${count} items` : ""}`}
          >
            <CartIcon className="h-8 w-8" />
            {mounted && count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex min-h-[1.25rem] min-w-[1.25rem] items-center justify-center rounded-full bg-[#037eff] px-1.5 text-xs font-semibold text-white">
                {count > 99 ? "99+" : count}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 text-[#001f40] transition duration-200 ease-out hover:bg-gray-50 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#037eff]"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-gray-100 bg-white md:hidden"
        >
          <nav
            className={`mx-auto flex max-w-7xl flex-col gap-1 py-4 ${PAGE_PAD_X}`}
            aria-label="Mobile navigation"
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-3 text-sm font-medium text-[#001f40] transition duration-200 ease-out hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_WA_ME}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-4 py-3 text-sm font-medium text-[#037eff] transition duration-200 ease-out hover:bg-[#037eff]/5"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
      </header>
    </>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M6 6h15l-1.5 9h-12z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6 5 3H2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
