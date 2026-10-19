import {
  AboutHero,
  ImpactGrid,
  Partners,
  Stories,
  Timeline,
} from "@/components/about/about-static";
import { Approach, WhatDrivesUs } from "@/components/about/about-interactive";
import { DonateProvider } from "@/components/donate/donate-context";
import { ChooseBand } from "@/components/healthcare/healthcare-sections";
import { CtaBand } from "@/components/home/cta-band";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getPublishedAbout,
  getPublishedHeader,
} from "@/content/published";

export const metadata = {
  title: "About Us | Human Concern USA",
  description:
    "For over four decades, Human Concern USA has stood with vulnerable communities worldwide, providing relief, dignity, and opportunities for a better future.",
};

/* The same band as the other pages, carrying this page's destinations. */
const CTA_BAND = {
  headingStart: "Give Hope.",
  headingAccent: "Inspire",
  headingEnd: "Change",
  subtitle: "We'd love to hear from you.",
  primaryCta: "Become a Volunteer",
  secondaryCta: "Travel with Us",
};

export default async function AboutUsPage() {
  const [content, header] = await Promise.all([
    getPublishedAbout(),
    getPublishedHeader(),
  ]);

  return (
    <DonateProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-surface focus:px-6 focus:py-3 focus:text-ink focus:shadow-raised"
      >
        Skip to content
      </a>

      {/* The header floats over the hero, so nothing above it needs spacing. */}
      <div className="relative isolate">
        <SiteHeader className="absolute inset-x-0 top-2 z-20" content={header} />

        <main id="main" className={content.visible.hero ? undefined : "pt-32 lg:pt-[7.5rem]"}>
          {content.visible.hero ? <AboutHero content={content.hero} /> : null}
          {content.visible.timeline ? <Timeline content={content.timeline} /> : null}
          {content.visible.drives ? <WhatDrivesUs content={content.drives} /> : null}
          {content.visible.impact ? <ImpactGrid content={content.impact} /> : null}
          {content.visible.approach ? <Approach content={content.approach} /> : null}
          {content.visible.stories ? <Stories content={content.stories} /> : null}
          {content.visible.partners ? <Partners content={content.partners} /> : null}
          {content.visible.choose ? (
            <ChooseBand content={content.choose} formId={content.choose.form} />
          ) : null}
          {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
        </main>
      </div>

      <SiteFooter />
    </DonateProvider>
  );
}
