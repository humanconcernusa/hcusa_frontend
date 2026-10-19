import { DonateProvider } from "@/components/donate/donate-context";
import { ChooseBand } from "@/components/healthcare/healthcare-sections";
import { CtaBand } from "@/components/home/cta-band";
import { QuickDonate } from "@/components/home/quick-donate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AlertBar } from "@/components/alert-bar";
import { LebanonHero } from "@/components/lebanon-emergency/lebanon-emergency-hero";
import {
  DonationHelps,
  Giving,
  RespondSteps,
  StatsBand,
  WhatsHappening,
} from "@/components/lebanon-emergency/lebanon-emergency-sections";
import {
  getPublishedHeader,
  lebanonStore,
} from "@/content/published";

export const metadata = {
  title: "Lebanon Emergency Relief | Human Concern USA",
  description:
    "Families across Lebanon are being forced from their homes as violence and airstrikes continue. Help provide emergency food, clean water, shelter, hygiene essentials, and urgent care.",
};

/* The same band as the other appeal pages, carrying this page's words. */
const CTA_BAND = {
  headingStart: "Give Hope.",
  headingAccent: "Inspire",
  headingEnd: "Change",
  subtitle: "We'd love to hear from you.",
  primaryCta: "Become a Volunteer",
  secondaryCta: "Travel with Us",
};

export default async function LebanonEmergencyPage() {
  const [content, header] = await Promise.all([
    lebanonStore.getPublished(),
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
          <LebanonHero content={content.hero} />
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
