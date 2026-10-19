import Image from "next/image";
import { ButtonLink, Callout, Eyebrow, Media } from "@/components/ui";
import { OUR_TEAM_LINKS, type OurTeamPageContent } from "@/content/our-team";

/*
  The Our Team page. Nothing here holds state, so the whole page is server-rendered.
*/

/*
  Wraps the chosen words in a red underline. If the phrase is not in the paragraph, or the
  field is empty, the text is returned untouched rather than a stray underline appearing.
*/
function withHighlight(text: string, phrase: string) {
  const at = phrase.length > 0 ? text.indexOf(phrase) : -1;
  if (at < 0) return text;

  return (
    <>
      {text.slice(0, at)}
      <span className="underline decoration-action decoration-2 underline-offset-4">{phrase}</span>
      {text.slice(at + phrase.length)}
    </>
  );
}

export function TeamHero({ content }: { content: OurTeamPageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      <div className="absolute inset-0 -z-10">
        <Media src={content.image} alt={content.imageAlt} sizes="100vw" />
      </div>

      <div className="container-page pt-32 pb-14 lg:min-h-[40rem] lg:pt-[7.5rem] lg:pb-[7rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-action/20 bg-tint px-4 py-2 text-[0.75rem] font-medium tracking-[0.14em] text-action uppercase">
            {/* The group glyph beats like the heart on the About Us pill. */}
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5 shrink-0 origin-center animate-heartbeat fill-action"
            >
              <circle cx="9" cy="7.5" r="3.5" />
              <rect x="2.5" y="13" width="13" height="7.5" rx="3.75" />
              <circle cx="17.2" cy="9.8" r="2.6" />
              <rect x="14.2" y="14.4" width="7.8" height="6.1" rx="3.05" />
            </svg>

            {content.eyebrow}

            {/* The three dots, popping left to right. */}
            <span aria-hidden="true" className="flex items-center gap-1">
              <span className="size-1 origin-center animate-dot-wave rounded-full bg-action" />
              <span className="size-1 origin-center animate-dot-wave rounded-full bg-action [animation-delay:-1350ms]" />
              <span className="size-1 origin-center animate-dot-wave rounded-full bg-action [animation-delay:-1200ms]" />
            </span>
          </span>

          <h1 className="mt-5 text-[2rem] leading-[1.3] font-semibold sm:text-[2.75rem] lg:text-[3.125rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>
          </h1>

          <Callout className="mt-6 max-w-[34rem]">
            {withHighlight(content.body, content.bodyHighlight)}
          </Callout>

          {/* Stacked and full width on a phone; side by side from sm. */}
          <div className="actions-stack mt-6 flex flex-wrap gap-3">
            <ButtonLink
              href={OUR_TEAM_LINKS.contact}
              size="lg"
              variant="primary"
              className="hover:shadow-raised"
            >
              {content.primaryCta}
            </ButtonLink>
            <ButtonLink href={OUR_TEAM_LINKS.volunteer} size="lg" variant="secondary">
              {content.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Integrity({ content }: { content: OurTeamPageContent["integrity"] }) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-[2rem] leading-[1.05] font-semibold lg:text-[2.75rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
            {content.headingEnd}
          </h2>

          <p className="mt-5 text-[1rem] leading-snug text-body">{content.body}</p>

          <ul className="mt-6 flex flex-col gap-2">
            {content.points.map((point, index) => (
              <li key={index} className="flex gap-3 text-[0.9375rem] leading-snug text-body">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <ButtonLink href={OUR_TEAM_LINKS.contact} variant="dark" size="lg" className="mt-8">
            {content.cta}
          </ButtonLink>
        </div>

        <div className="aspect-[4/3] w-full overflow-hidden rounded-card">
          <Media
            src={content.image}
            alt={content.imageAlt}
            sizes="(min-width: 1024px) 560px, 90vw"
          />
        </div>
      </div>
    </section>
  );
}

export function TeamSection({ content }: { content: OurTeamPageContent["team"] }) {
  return (
    <section className="bg-page py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
        </h2>

        <p className="mt-3 text-center text-[0.9375rem] text-body">{content.subtitle}</p>

        <ul className="mx-auto mt-12 grid max-w-[62rem] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.members.map((member, index) => (
            <li
              key={index}
              className="flex items-center gap-4 rounded-card bg-surface p-5 shadow-card"
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-full">
                <Image src={member.image} alt={member.imageAlt} fill sizes="56px" className="object-cover" />
              </span>

              {/* Short enough to leave a little room above and below it. */}
              <span aria-hidden="true" className="h-10 w-px shrink-0 bg-line" />

              <span className="min-w-0">
                <span className="block text-[1.25rem] font-medium tracking-wide text-ink uppercase">
                  {member.name}
                </span>
                <span className="mt-1 block text-[0.875rem] font-medium text-leaf">
                  {member.role}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BoardSection({ content }: { content: OurTeamPageContent["board"] }) {
  return (
    <section className="bg-page py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
        </h2>

        <p className="mt-3 text-center text-[0.9375rem] text-body">{content.subtitle}</p>

        {/*
          A compact row on a phone, where the stacked card left a wide arc of empty space around
          the portrait. From sm up the roomier stacked card comes back, as the design has it.
        */}
        <ul className="grid-3-from-820 mx-auto mt-12 grid max-w-[62rem] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.members.map((member, index) => (
            <li
              key={index}
              className="flex items-center gap-4 rounded-card bg-surface p-5 shadow-card sm:flex-col sm:items-center sm:gap-4 sm:px-5 sm:py-8 sm:text-center"
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-full sm:size-20">
                <Image
                  src={member.image}
                  alt={member.imageAlt}
                  fill
                  sizes="(min-width: 640px) 80px, 56px"
                  className="object-cover"
                />
              </span>

              {/* Upright beside the portrait on a phone; across the card from sm up. */}
              <span
                aria-hidden="true"
                className="h-10 w-px shrink-0 bg-line sm:h-px sm:w-11/12 sm:bg-divider"
              />

              <span className="min-w-0 sm:w-full">
                <span className="block text-[1.25rem] font-medium tracking-wide text-ink uppercase sm:font-semibold">
                  {member.name}
                </span>
                <span className="mt-1 block text-[0.875rem] font-medium text-action sm:mt-0 sm:inline-block sm:rounded-full sm:bg-tint sm:px-3 sm:py-1">
                  {member.role}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/*
  The six boxes over the warehouse photo, in item order. The icons are owned by the code.
  Each file is a whole tile: the rounded square, its red border and the red glyph together,
  so the card does not draw a tile of its own.
*/
const STAND_ICONS = [
  "/images/our-team/stand-1.svg",
  "/images/our-team/stand-2.svg",
  "/images/our-team/stand-3.svg",
  "/images/our-team/stand-4.svg",
  "/images/our-team/stand-5.svg",
  "/images/our-team/stand-6.svg",
];

export function StandFor({ content }: { content: OurTeamPageContent["standFor"] }) {
  return (
    <section className="relative isolate bg-ink">
      <div className="absolute inset-0 -z-10">
        <Media src={content.image} alt={content.imageAlt} sizes="100vw" />
      </div>

      <div className="container-page py-14 lg:py-20">
        <h2 className="text-center text-[2.25rem] leading-[1.1] font-semibold text-white lg:text-[3.25rem]">
          {content.headingStart} <span className="accent text-brand">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <ul className="stand-grid mx-auto mt-12 grid max-w-[50rem] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <li
              key={index}
              className="flex flex-col items-center gap-3 rounded-card border border-white/15 bg-surface/10 px-3 py-6 text-center backdrop-blur-sm sm:gap-5 sm:px-5 sm:py-8"
            >
              <span className="relative size-12 shrink-0 sm:size-16">
                <Image
                  src={STAND_ICONS[index % STAND_ICONS.length]}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 64px, 48px"
                  className="object-contain"
                />
              </span>

              <span className="text-[0.9375rem] font-medium tracking-wide text-white uppercase sm:text-[1.125rem]">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function JoinBand({ content }: { content: OurTeamPageContent["join"] }) {
  return (
    <section id="join" className="bg-page py-16 lg:py-20">
      <div className="container-page">
        <div className="flex flex-col items-center gap-6 rounded-card bg-surface px-6 py-12 text-center shadow-card">
          <h2 className="text-[1.75rem] font-semibold lg:text-[2.25rem]">{content.heading}</h2>

          <div className="actions-stack flex flex-wrap justify-center gap-3">
            <ButtonLink href={OUR_TEAM_LINKS.volunteer} variant="darkHover" size="lg">
              {content.primaryCta}
            </ButtonLink>
            <ButtonLink
              href={OUR_TEAM_LINKS.careers}
              variant="primary"
              size="lg"
              className="hover:shadow-raised"
            >
              {content.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
