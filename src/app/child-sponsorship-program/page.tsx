import { ChildSponsorshipHero } from "@/components/child-sponsorship/child-sponsorship-hero";
import {
  Faq,
  GlobalLocations,
  WhySponsor,
} from "@/components/child-sponsorship/child-sponsorship-sections";
import { DonateProvider } from "@/components/donate/donate-context";
import { CtaBand } from "@/components/home/cta-band";
import { QuickDonate } from "@/components/home/quick-donate";
import {
  ChooseBand,
  CounterBand,
  GivingLevels,
  StoriesVideo,
} from "@/components/healthcare/healthcare-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  childSponsorshipStore,
  getPublishedHeader,
} from "@/content/published";

/*
  The Child Sponsorship page. It follows the food-aid and water-aid pages, so it renders their
  sections wherever the wording alone drives them, plus a map band and a questions list of its
  own. The wording lives in src/content/child-sponsorship.ts.
*/
export const metadata = {
  title: "Child Sponsorship Program | Human Concern USA",
  description:
    "Provide vulnerable children with the food, education, and healthcare needed to break the cycle of poverty and build a brighter future.",
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

export default async function ChildSponsorshipPage() {
  const [content, header] = await Promise.all([
    childSponsorshipStore.getPublished(),
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
          {content.visible.hero ? <ChildSponsorshipHero content={content.hero} /> : null}
          {content.visible.why ? <WhySponsor content={content.why} /> : null}
          {content.visible.stories ? <StoriesVideo content={content.stories} /> : null}
          {content.visible.counters ? <CounterBand content={content.counters} /> : null}
          {content.visible.global ? <GlobalLocations content={content.global} /> : null}
          {content.visible.giving ? <GivingLevels content={content.giving} /> : null}
          {content.visible.choose ? (
            <ChooseBand content={content.choose} formId={content.choose.form} />
          ) : null}
          {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
          {content.visible.faq ? <Faq content={content.faq} /> : null}
        </main>
      </div>

      <SiteFooter />
      <QuickDonate />
    </DonateProvider>
  );
}
