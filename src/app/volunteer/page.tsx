import { DonateProvider } from "@/components/donate/donate-context";
import { QuickDonate } from "@/components/home/quick-donate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VolunteerHero } from "@/components/volunteer/volunteer-hero";
import {
  ExpectSteps,
  Opportunities,
  VolunteerExperiences,
  WhyYourTime,
} from "@/components/volunteer/volunteer-sections";
import {
  getPublishedHeader,
  volunteerStore,
} from "@/content/published";

/*
  The Volunteer page. Its bands are its own rather than the shared appeal bands; the wording lives
  in src/content/volunteer.ts.
*/
export const metadata = {
  title: "Volunteer — Serve Humanity, Create Impact | Human Concern USA",
  description:
    "Join a community of compassionate volunteers changing lives through service, dedication, and meaningful action. Together, we can make a difference locally and globally.",
};

export default async function VolunteerPage() {
  const [content, header] = await Promise.all([
    volunteerStore.getPublished(),
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
          {content.visible.hero ? <VolunteerHero content={content.hero} /> : null}
          {content.visible.why ? <WhyYourTime content={content.why} /> : null}
          {content.visible.opportunities ? (
            <Opportunities content={content.opportunities} />
          ) : null}
          {content.visible.experiences ? (
            <VolunteerExperiences content={content.experiences} />
          ) : null}
          {content.visible.steps ? <ExpectSteps content={content.steps} /> : null}
        </main>
      </div>

      <SiteFooter />
      <QuickDonate />
    </DonateProvider>
  );
}
