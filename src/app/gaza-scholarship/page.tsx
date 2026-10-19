import { DonateProvider } from "@/components/donate/donate-context";
import { GazaHero } from "@/components/gaza-scholarship/gaza-scholarship-hero";
import {
  DonationHelps,
  Giving,
  RespondSteps,
  StatsBand,
  WhyScholarship,
} from "@/components/gaza-scholarship/gaza-scholarship-sections";
import { ChooseBand } from "@/components/healthcare/healthcare-sections";
import { CtaBand } from "@/components/home/cta-band";
import { QuickDonate } from "@/components/home/quick-donate";
import { VideoBanner } from "@/components/home/video-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AlertBar } from "@/components/alert-bar";
import {
  gazaScholarshipStore,
  getPublishedHeader,
} from "@/content/published";

export const metadata = {
  title: "Gaza Scholarship | Human Concern USA",
  description:
    "Support Gaza's future doctors. Help thousands of medical students continue their education with emergency scholarship assistance.",
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

export default async function GazaScholarshipPage() {
  const [content, header] = await Promise.all([
    gazaScholarshipStore.getPublished(),
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
          <GazaHero content={content.hero} />
          <AlertBar text={content.alert} />
          <WhyScholarship content={content.why} />
          <DonationHelps content={content.helps} />
          <RespondSteps content={content.responds} />
          <VideoBanner content={content.video} />
          <StatsBand content={content.stats} />
          <Giving content={content.giving} />
          <ChooseBand content={content.choose} formId={content.choose.form} />
          <CtaBand content={CTA_BAND} />
        </main>
      </div>

      <SiteFooter />
      <QuickDonate />
    </DonateProvider>
  );
}
