import { DonateProvider } from "@/components/donate/donate-context";
import { CtaBand } from "@/components/home/cta-band";
import { PolicyAccordion, PrivacyHero } from "@/components/privacy/privacy-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getPublishedHeader,
  getPublishedPrivacy,
} from "@/content/published";

export const metadata = {
  title: "Privacy Policy | Human Concern USA",
  description:
    "Committed to transparency and trust. Read how Human Concern USA collects, uses and protects your information.",
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

export default async function PrivacyPolicyPage() {
  const [content, header] = await Promise.all([
    getPublishedPrivacy(),
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
          {content.visible.hero ? <PrivacyHero content={content.hero} /> : null}
          {content.visible.policy ? <PolicyAccordion content={content.policy} /> : null}
          {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
        </main>
      </div>

      <SiteFooter />
    </DonateProvider>
  );
}
