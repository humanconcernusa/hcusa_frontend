import { ButtonLink } from "@/components/ui";
import type { HomeContent } from "@/content/home";

export function CtaBand({ content }: { content: HomeContent["ctaBand"] }) {
  return (
    <section id="get-involved" className="bg-band py-14 lg:py-28">
      <div className="container-page text-center">
        <h2 className="text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        {/*
          text-balance evens the lines out on a phone, so the sentence does not break into one
          long line and one short one. Where it already fits on a single line nothing changes.
        */}
        <p className="mt-6 text-[0.9375rem] text-balance tracking-normal text-ink uppercase sm:mt-5 sm:text-[0.875rem] sm:font-medium sm:tracking-[0.14em]">
          {content.subtitle}
        </p>

        {/* Side by side on phones too, at a smaller size so both fit on one line. Below 405px
            they stack and share the width — see .actions-stack-tight in styles/responsive.css. */}
        <div className="actions-stack-tight mt-6 flex flex-wrap justify-center gap-2.5 sm:mt-8 sm:gap-4">
          <ButtonLink href="/volunteer" variant="darkHover" className="max-sm:px-4 sm:min-h-12 sm:px-8 sm:text-base">
            {content.primaryCta}
          </ButtonLink>
          <ButtonLink href="/travel-with-us" variant="secondary" className="sm:min-h-12 sm:px-8 sm:text-base">
            {content.secondaryCta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
