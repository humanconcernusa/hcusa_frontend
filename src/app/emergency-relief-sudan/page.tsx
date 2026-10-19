import { DonateProvider } from "@/components/donate/donate-context";
import { ChooseBand } from "@/components/healthcare/healthcare-sections";
import { CtaBand } from "@/components/home/cta-band";
import { QuickDonate } from "@/components/home/quick-donate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AlertBar } from "@/components/alert-bar";
import { SudanHero } from "@/components/sudan-relief/sudan-relief-hero";
import {
  DonationHelps,
  Giving,
  RespondSteps,
  StatsBand,
  WhatsHappening,
} from "@/components/sudan-relief/sudan-relief-sections";
import {
  getPublishedHeader,
  sudanStore,
} from "@/content/published";

export const metadata = {
  title: "Sudan Emergency Relief | Human Concern USA",
  description:
    "Stand with Sudan. Provide life-saving food, clean water, medical aid, and hygiene support to families caught in one of the world's worst humanitarian crises.",
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

export default async function EmergencyReliefSudanPage() {
  const [content, header] = await Promise.all([
    sudanStore.getPublished(),
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
          <SudanHero content={content.hero} />
          <AlertBar text={content.alert} />
          <WhatsHappening content={content.happening} />
          <DonationHelps content={content.helps} />
          <RespondSteps content={content.responds} />
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
