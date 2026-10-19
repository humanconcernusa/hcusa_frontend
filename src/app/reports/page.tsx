import { DonateProvider } from "@/components/donate/donate-context";
import { ChooseBand } from "@/components/healthcare/healthcare-sections";
import { CtaBand } from "@/components/home/cta-band";
import {
  GlobalMap,
  ReportsHero,
  ReportsIntro,
  ReportsList,
} from "@/components/reports/reports-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getPublishedHeader,
  getPublishedReports,
} from "@/content/published";

export const metadata = {
  title: "Reports & Transparency | Human Concern USA",
  description:
    "Explore our annual reports, financial audits, emergency response updates, and impact summaries.",
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

export default async function ReportsPage() {
  const [content, header] = await Promise.all([
    getPublishedReports(),
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
          {content.visible.hero ? <ReportsHero content={content.hero} /> : null}
          {content.visible.intro ? <ReportsIntro content={content.intro} /> : null}
          {content.visible.list ? <ReportsList content={content.list} /> : null}
          {content.visible.choose ? (
            /*
              The shared band. This page still has no button of its own here, so the label stays
              empty and the band draws none. The popup that button would open comes from the
              content, like every other page that uses this band.
            */
            <ChooseBand
              content={{ ...content.choose, cta: "" }}
              formId={content.choose.form}
            />
          ) : null}
          {content.visible.global ? <GlobalMap content={content.global} /> : null}
          {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
        </main>
      </div>

      <SiteFooter />
    </DonateProvider>
  );
}
