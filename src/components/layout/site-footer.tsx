import Link from "next/link";
import {
  WHATSAPP_WA_ME,
  WHATSAPP_DISPLAY,
  TRUST_TAGLINE,
  REGISTRATION_NUMBER,
  SITE_CREDIT_NAME,
  SITE_CREDIT_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL,
} from "@/lib/site-config";
import { PAGE_PAD_X } from "@/components/layout/page-container";

const quickLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/delivery", label: "Delivery Info" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const supportLinks = [
  { href: "/track-order", label: "Track order" },
  { href: "/delivery", label: "Shipping & delivery" },
  { href: "/contact", label: "Help & support" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const footerLinkClass =
  "text-base font-medium leading-snug text-white/80 transition duration-200 ease-out hover:text-white hover:underline underline-offset-[3px] md:text-lg";

const footerHeadingClass =
  "text-lg font-bold tracking-tight text-white md:text-xl";

interface SocialGlyphProps {
  className?: string;
}

function InstagramGlyph({ className }: SocialGlyphProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookGlyph({ className }: SocialGlyphProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-secondary text-white">
      <div
        className={`mx-auto max-w-7xl py-12 md:py-14 lg:py-16 ${PAGE_PAD_X}`}
      >
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <p className={footerHeadingClass}>About Librica Med</p>
            <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-white/80 md:text-lg">
              {TRUST_TAGLINE}. Curated medical and healthcare books with
              islandwide delivery and WhatsApp-assisted ordering.
            </p>
            <p className="mt-5 text-base font-medium tabular-nums text-white/65 md:text-lg">
              Reg No: {REGISTRATION_NUMBER}
            </p>
          </div>

          <div>
            <p className={footerHeadingClass}>Quick links</p>
            <ul className="mt-5 flex flex-col gap-4">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={footerLinkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={footerHeadingClass}>Support</p>
            <ul className="mt-5 flex flex-col gap-4">
              {supportLinks.map((l) => (
                <li key={`${l.href}-${l.label}`}>
                  <Link href={l.href} className={footerLinkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={footerHeadingClass}>Contact</p>
            <p className="mt-5 text-base font-medium leading-relaxed text-white/80 md:text-lg">
              <a
                href={WHATSAPP_WA_ME}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6eb8ff] transition duration-200 ease-out hover:underline"
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-white/55 md:text-base">
              Follow us
            </p>
            <ul className="mt-3 flex flex-wrap gap-3" aria-label="Social media">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white/90 transition duration-200 ease-out hover:border-white/40 hover:bg-white/10 hover:text-white md:h-14 md:w-14"
                  aria-label="Librica Med on Instagram"
                >
                  <InstagramGlyph className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </li>
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white/90 transition duration-200 ease-out hover:border-white/40 hover:bg-white/10 hover:text-white md:h-14 md:w-14"
                  aria-label="Librica Med on Facebook"
                >
                  <FacebookGlyph className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-base font-semibold tracking-tight text-white transition duration-200 ease-out hover:border-white/40 hover:bg-white/10 md:px-9 md:py-4 md:text-lg"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10 md:mt-16 md:pt-12">
          <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:gap-6 md:text-left">
            <p className="text-sm font-medium leading-snug text-white/60 md:text-base">
              © {year} Librica Med. All rights reserved.
            </p>
            <p className="text-sm font-medium leading-snug text-white/60 md:text-base">
              Website developed by{" "}
              <a
                href={SITE_CREDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline decoration-white/30 underline-offset-2 transition duration-200 ease-out hover:text-white hover:decoration-white/60"
              >
                {SITE_CREDIT_NAME}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
