import { DonateProvider } from "@/components/donate/donate-context";
import { ChooseBand } from "@/components/healthcare/healthcare-sections";
import { CtaBand } from "@/components/home/cta-band";
import { QuickDonate } from "@/components/home/quick-donate";
import { VideoBanner } from "@/components/home/video-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SupportAfricaHero } from "@/components/support-africa/support-africa-hero";
import { AlertBar } from "@/components/alert-bar";
import {
  ReliefGrid,
  RespondSteps,
  SupportGiving,
  WhyNeeded,
} from "@/components/support-africa/support-africa-sections";
import {
  getPublishedHeader,
  supportAfricaStore,
} from "@/content/published";

export const metadata = {
  title: "Support Africa's Forgotten Ummah | Human Concern USA",
  description:
    "Provide life-saving food, clean water, and sustainable healthcare to vulnerable communities across Africa.",
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

export default async function SupportAfricasForgottenUmmahPage() {
  const [content, header] = await Promise.all([
    supportAfricaStore.getPublished(),
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
          <SupportAfricaHero content={content.hero} />
          <AlertBar text={content.alert} />
          <WhyNeeded content={content.why} />
          <ReliefGrid content={content.relief} />
          <RespondSteps content={content.responds} />
          <VideoBanner content={content.video} />
          <SupportGiving content={content.giving} />
          <ChooseBand content={content.choose} formId={content.choose.form} />
          <CtaBand content={CTA_BAND} />
        </main>
      </div>

      <SiteFooter />
      <QuickDonate />
    </DonateProvider>
  );
}
