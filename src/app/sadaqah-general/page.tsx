import { DonateProvider } from "@/components/donate/donate-context";
import { CtaBand } from "@/components/home/cta-band";
import { QuickDonate } from "@/components/home/quick-donate";
import {
  ChooseBand,
  GivingLevels,
  StoriesVideo,
} from "@/components/healthcare/healthcare-sections";
import { SadaqahHero } from "@/components/sadaqah/sadaqah-hero";
import { WhySadaqah } from "@/components/sadaqah/sadaqah-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getPublishedHeader,
  sadaqahStore,
} from "@/content/published";

/*
  The Sadaqah page. Every band is one the other appeal pages already use, driven by this page's
  wording, which lives in src/content/sadaqah.ts.
*/
export const metadata = {
  title: "Sadaqah — Giving with Compassion, Changing Lives | Human Concern USA",
  description:
    "Your Sadaqah provides immediate relief, long-term support, and hope to families facing hardship. Every act of charity brings blessings and transforms lives.",
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

export default async function SadaqahPage() {
  const [content, header] = await Promise.all([
    sadaqahStore.getPublished(),
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

        <main id="main">
          {content.visible.hero ? <SadaqahHero content={content.hero} /> : null}
          {content.visible.why ? <WhySadaqah content={content.why} /> : null}
          {content.visible.stories ? (
            <StoriesVideo content={content.stories} className="pt-14 pb-20 lg:pt-20 lg:pb-28" />
          ) : null}
          {content.visible.giving ? (
            <GivingLevels content={content.giving} className="pt-8 pb-20 lg:pt-12 lg:pb-28" />
          ) : null}
          {content.visible.choose ? (
            <ChooseBand content={content.choose} formId={content.choose.form} />
          ) : null}
          {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
        </main>
      </div>

      <SiteFooter />
      <QuickDonate />
    </DonateProvider>
  );
}
