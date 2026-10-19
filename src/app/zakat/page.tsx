import { DonateProvider } from "@/components/donate/donate-context";
import { CtaBand } from "@/components/home/cta-band";
import { QuickDonate } from "@/components/home/quick-donate";
import {
  ChooseBand,
  GivingLevels,
  StoriesVideo,
} from "@/components/healthcare/healthcare-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ZakatHero } from "@/components/zakat/zakat-hero";
import {
  CalculatorBanner,
  WhereZakatGoes,
  WhoCanReceive,
  WhyZakat,
} from "@/components/zakat/zakat-sections";
import {
  getPublishedHeader,
  zakatStore,
} from "@/content/published";

/*
  The Zakat page. It follows the other appeal pages, so it renders their sections wherever the
  wording alone drives them, plus four bands of its own. The wording lives in
  src/content/zakat.ts.
*/
export const metadata = {
  title: "Zakat — Purifying Wealth, Empowering Lives | Human Concern USA",
  description:
    "Zakat purifies wealth and reaches those most in need. Give your Zakat through Human Concern USA, and work out what is due with our calculator.",
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

export default async function ZakatPage() {
  const [content, header] = await Promise.all([
    zakatStore.getPublished(),
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
          {content.visible.hero ? <ZakatHero content={content.hero} /> : null}
          {content.visible.why ? (
            <WhyZakat content={content.why} rates={content.calculator} />
          ) : null}
          {content.visible.stories ? (
            <StoriesVideo content={content.stories} className="py-14 lg:py-20" />
          ) : null}
          {content.visible.giving ? (
            <GivingLevels content={content.giving} className="pb-20 lg:pb-28" />
          ) : null}
          {content.visible.who ? <WhoCanReceive content={content.who} /> : null}
          {content.visible.calculator ? <CalculatorBanner content={content.calculator} /> : null}
          {content.visible.where ? <WhereZakatGoes content={content.where} /> : null}
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
