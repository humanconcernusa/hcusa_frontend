import { ContactHero } from "@/components/contact/contact-hero";
import { SendMessage } from "@/components/contact/contact-form";
import { HowCanWeHelp } from "@/components/contact/contact-sections";
import { DonateProvider } from "@/components/donate/donate-context";
import { CtaBand } from "@/components/home/cta-band";
import { QuickDonate } from "@/components/home/quick-donate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contactStore, getPublishedHeader } from "@/content/published";

/*
  The Contact Us page. The wording lives in src/content/contact.ts.
*/
export const metadata = {
  title: "Contact Us — Connect with Human Concern USA",
  description:
    "Have a question, need support, or want to get involved? Our team is ready to assist you with care and responsibility.",
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

export default async function ContactUsPage() {
  const [content, header] = await Promise.all([
    contactStore.getPublished(),
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
          <ContactHero content={content.hero} />
          <HowCanWeHelp content={content.help} />
          <SendMessage content={content.form} />
          <CtaBand content={CTA_BAND} />
        </main>
      </div>

      <SiteFooter />
      <QuickDonate />
    </DonateProvider>
  );
}
