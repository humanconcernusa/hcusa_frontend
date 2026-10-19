import { DonateProvider } from "@/components/donate/donate-context";
import { FoodAidHero } from "@/components/food-aid/food-aid-hero";
import { WhyFoodAid } from "@/components/food-aid/food-aid-sections";
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
  foodAidStore,
  getPublishedHeader,
} from "@/content/published";

/*
  The Food Aid page. It follows the healthcare page, so it renders that page's sections
  wherever the wording alone drives them. The wording is a first draft and lives in
  src/content/food-aid.ts.
*/
export const metadata = {
  title: "Food Aid for Families in Crisis | Human Concern USA",
  description:
    "Your support puts emergency food packs, hot meals, and clean water into the hands of families who would otherwise go hungry.",
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

export default async function FoodAidPage() {
  const [content, header] = await Promise.all([
    foodAidStore.getPublished(),
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
          {content.visible.hero ? <FoodAidHero content={content.hero} /> : null}
          {content.visible.why ? <WhyFoodAid content={content.why} /> : null}
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
