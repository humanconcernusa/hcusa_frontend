import { DonateProvider } from "@/components/donate/donate-context";
import { QuickDonate } from "@/components/home/quick-donate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { YouthAnnouncement } from "@/components/youth/youth-announcement";
import { YouthFaq } from "@/components/youth/youth-faq";
import { YouthHero } from "@/components/youth/youth-hero";
import { Benefits, Closing, Intro, MoreThan, Phases, Turkey } from "@/components/youth/youth-sections";
import { YouthTimeline } from "@/components/youth/youth-timeline";
import {
  getPublishedHeader,
  youthStore,
} from "@/content/published";

/*
  The HCI Global Humanitarian Youth Fellowship page. The wording lives in src/content/youth.ts.
*/
export const metadata = {
  title: "HCI's Global Humanitarian Youth Fellowship | Human Concern USA",
  description:
    "A leadership journey rooted in faith, service, and real-world impact. Applications are open April 1 – May 31, 2026.",
};

export default async function YouthFellowshipPage() {
  const [content, header] = await Promise.all([
    youthStore.getPublished(),
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

      {/* The header floats over the hero, so nothing above it needs spacing. The foot of the page
          carries extra room so the fixed announcement bar never covers the footer's last line. */}
      <div className="relative isolate">
        <SiteHeader className="absolute inset-x-0 top-2 z-20" content={header} />

        <main id="main">
          <YouthHero content={content.hero} />
          <YouthAnnouncement content={content.announcement} />
          <Intro content={content.intro} />
          <Benefits content={content.benefits} />
          <Turkey content={content.turkey} />
          <YouthTimeline content={content.timeline} />
          <Phases content={content.phases} />
          {/* The bar appears a second time here, as the reference has it. */}
          <YouthAnnouncement content={content.announcement} />
          <MoreThan content={content.more} />
          <YouthFaq content={content.faq} />
          <Closing content={content.closing} />
        </main>
      </div>

      <SiteFooter />
      <QuickDonate />
    </DonateProvider>
  );
}
