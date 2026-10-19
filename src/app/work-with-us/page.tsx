import { CareersHero } from "@/components/careers/careers-hero";
import { FeaturedJobOpenings, WhyHcusa } from "@/components/careers/careers-sections";
import { ResumeForm } from "@/components/careers/resume-form";
import { DonateProvider } from "@/components/donate/donate-context";
import { CtaBand } from "@/components/home/cta-band";
import { QuickDonate } from "@/components/home/quick-donate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  careersStore,
  getPublishedHeader,
} from "@/content/published";

/*
  The Work With Us page. Its bands are its own rather than the shared appeal bands; the wording
  lives in src/content/careers.ts.
*/
export const metadata = {
  title: "Work With Us — Careers at Human Concern USA",
  description:
    "Build your career with Human Concern USA. Become part of a global effort dedicated to saving lives, empowering communities, and creating long-term change.",
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

export default async function WorkWithUsPage() {
  const [content, header] = await Promise.all([
    careersStore.getPublished(),
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
          {content.visible.hero ? <CareersHero content={content.hero} /> : null}
          {content.visible.why ? <WhyHcusa content={content.why} /> : null}
          {content.visible.jobs ? <FeaturedJobOpenings content={content.jobs} /> : null}
          {content.visible.resume ? <ResumeForm content={content.resume} /> : null}
          {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
        </main>
      </div>

      <SiteFooter />
      <QuickDonate />
    </DonateProvider>
  );
}
