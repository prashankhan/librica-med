import Link from "next/link";
import {
  SITE_URL,
  WHATSAPP_WA_ME,
  WHATSAPP_DISPLAY,
  TRUST_TAGLINE,
  REGISTRATION_NUMBER,
} from "@/lib/site-config";

const footerLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/delivery", label: "Delivery Info" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/track-order", label: "Track Order" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#001f40] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-semibold tracking-tight text-white">
              Librica Med
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
              {TRUST_TAGLINE}. Curated medical and healthcare books with
              islandwide delivery and straightforward WhatsApp-assisted ordering.
            </p>
            <p className="mt-4 text-xs text-white/55">
              Registration No: {REGISTRATION_NUMBER}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Quick links
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/80 hover:text-[#5eb0ff] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Contact
            </p>
            <p className="mt-4 text-sm text-white/80">
              <a
                href={WHATSAPP_WA_ME}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#5eb0ff] hover:underline"
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </p>
            <p className="mt-2 text-sm text-white/70">
              <a href={SITE_URL} className="hover:text-white transition-colors">
                {SITE_URL.replace(/^https?:\/\//, "")}
              </a>
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center text-xs text-white/45">
          © {new Date().getFullYear()} Librica Med. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
