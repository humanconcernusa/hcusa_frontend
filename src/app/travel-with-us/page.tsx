import { DonateProvider } from "@/components/donate/donate-context";
import { CtaBand } from "@/components/home/cta-band";
import { QuickDonate } from "@/components/home/quick-donate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TravelDiscover } from "@/components/travel/travel-discover";
import { TravelExperiences } from "@/components/travel/travel-experiences";
import { TravelForm } from "@/components/travel/travel-form";
import { TravelHero } from "@/components/travel/travel-hero";
import { AboutTravel, HowItWorks } from "@/components/travel/travel-sections";
import {
  getPublishedHeader,
  travelStore,
} from "@/content/published";

/*
  The Travel With Us page. The wording lives in src/content/travel.ts.
*/
export const metadata = {
  title: "Travel With Us — A Transformative Journey | Human Concern USA",
  description:
    "Experience a transformative journey of service, learning, and global impact with Human Concern USA.",
};

/* The closing band on this page. */
const CTA_BAND = {
  headingStart: "Give Hope.",
  headingAccent: "Inspire",
  headingEnd: "Change",
  subtitle: "We'd love to hear from you.",
  primaryCta: "Become a Volunteer",
  secondaryCta: "Travel with Us",
};

export default async function TravelWithUsPage() {
  const [content, header] = await Promise.all([
    travelStore.getPublished(),
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
          {content.visible.hero ? <TravelHero content={content.hero} /> : null}
          {content.visible.about ? <AboutTravel content={content.about} /> : null}
          {content.visible.how ? <HowItWorks content={content.how} /> : null}
          {content.visible.discover ? <TravelDiscover content={content.discover} /> : null}
          {content.visible.experiences ? (
            <TravelExperiences content={content.experiences} />
          ) : null}
          {content.visible.form ? <TravelForm content={content.form} /> : null}
          {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
        </main>
      </div>

      <SiteFooter />
      <QuickDonate />
    </DonateProvider>
  );
}
