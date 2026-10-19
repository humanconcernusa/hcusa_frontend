import { DonateProvider } from "@/components/donate/donate-context";
import {
  BoardSection,
  Integrity,
  JoinBand,
  StandFor,
  TeamHero,
  TeamSection,
} from "@/components/our-team/our-team-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getPublishedHeader,
  getPublishedOurTeam,
} from "@/content/published";

export const metadata = {
  title: "Our Team | Human Concern USA",
  description:
    "Dedicated, compassionate, and committed to serving humanity for over 46 years. Meet the people behind the mission.",
};

export default async function OurTeamPage() {
  const [content, header] = await Promise.all([
    getPublishedOurTeam(),
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
          {content.visible.hero ? <TeamHero content={content.hero} /> : null}
          {content.visible.integrity ? <Integrity content={content.integrity} /> : null}
          {content.visible.team ? <TeamSection content={content.team} /> : null}
          {content.visible.board ? <BoardSection content={content.board} /> : null}
          {content.visible.standFor ? <StandFor content={content.standFor} /> : null}
          {content.visible.join ? <JoinBand content={content.join} /> : null}
        </main>
      </div>

      <SiteFooter />
    </DonateProvider>
  );
}
