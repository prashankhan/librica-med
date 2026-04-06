import { ButtonLink } from "@/components/ui/button";
import {
  PAGE_H1_CLASS,
  PAGE_LEAD_CLASS,
  PAGE_PRIMARY_CTA_CLASS,
  PAGE_READING_MAX_CLASS,
  PageContainer,
  SECTION_PAD_Y,
} from "@/components/layout/page-container";

export default function NotFound() {
  return (
    <PageContainer className={`${SECTION_PAD_Y} flex min-h-[50vh] flex-col items-center justify-center text-center`}>
      <div className={PAGE_READING_MAX_CLASS}>
        <p className="text-sm font-semibold uppercase tracking-widest text-[#037eff]">
          404
        </p>
        <h1 className={`mt-3 ${PAGE_H1_CLASS}`}>Page not found</h1>
        <p className={`mt-4 ${PAGE_LEAD_CLASS}`}>
          The page may have moved. Try the shop or return home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink
            href="/shop"
            variant="primary"
            className={PAGE_PRIMARY_CTA_CLASS}
          >
            Shop books
          </ButtonLink>
          <ButtonLink href="/" variant="outline" className={PAGE_PRIMARY_CTA_CLASS}>
            Home
          </ButtonLink>
        </div>
      </div>
    </PageContainer>
  );
}
