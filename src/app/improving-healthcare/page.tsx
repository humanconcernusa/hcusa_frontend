import { DonateProvider } from "@/components/donate/donate-context";
import { HealthcareHero } from "@/components/healthcare/healthcare-hero";
import {
  ChooseBand,
  CounterBand,
  GivingLevels,
  StoriesVideo,
  WhyHealthcare,
} from "@/components/healthcare/healthcare-sections";
import { CtaBand } from "@/components/home/cta-band";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getPublishedHealthcare,
  getPublishedHeader,
} from "@/content/published";

export const metadata = {
  title: "Improving Healthcare Access for Vulnerable Communities | Human Concern USA",
  description:
    "Your support provides medical care, essential treatments, emergency response, and long-term health solutions to vulnerable communities.",
};

/* The same band as the home page, carrying this page's destinations. */
const CTA_BAND = {
  headingStart: "Give Hope.",
  headingAccent: "Inspire",
  headingEnd: "Change",
  subtitle: "We'd love to hear from you.",
  primaryCta: "Become a Volunteer",
  secondaryCta: "Travel with Us",
};

export default async function ImprovingHealthcarePage() {
  const [content, header] = await Promise.all([
    getPublishedHealthcare(),
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
          {content.visible.hero ? <HealthcareHero content={content.hero} /> : null}
          {content.visible.why ? <WhyHealthcare content={content.why} /> : null}
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
    </DonateProvider>
  );
}
