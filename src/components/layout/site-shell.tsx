import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { StickyCartBar } from "@/components/layout/sticky-cart-bar";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-md:pb-24">{children}</main>
      <StickyCartBar />
      <SiteFooter />
    </>
  );
}
