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
import { WaterAidHero } from "@/components/water-aid/water-aid-hero";
import { WhyWaterAid } from "@/components/water-aid/water-aid-sections";
import {
  getPublishedHeader,
  waterAidStore,
} from "@/content/published";

/*
  The Water Aid page. It follows the food-aid and healthcare pages, so it renders their sections
  wherever the wording alone drives them. The wording lives in src/content/water-aid.ts.
*/
export const metadata = {
  title: "Water Aid — Clean Water Changes Everything | Human Concern USA",
  description:
    "For millions without safe water your support builds wells, restores health, and transforms entire communities.",
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

export default async function WaterAidPage() {
  const [content, header] = await Promise.all([
    waterAidStore.getPublished(),
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
          {content.visible.hero ? <WaterAidHero content={content.hero} /> : null}
          {content.visible.why ? <WhyWaterAid content={content.why} /> : null}
          {content.visible.stories ? <StoriesVideo content={content.stories} /> : null}
          {content.visible.counters ? <CounterBand content={content.counters} /> : null}
          {content.visible.giving ? <GivingLevels content={content.giving} /> : null}
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
