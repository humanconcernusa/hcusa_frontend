import type { ReactNode } from "react";
import { StoryQuote } from "@/components/about/about-interactive";
import { CountUp } from "@/components/count-up";
import { ButtonLink, Eyebrow, Media } from "@/components/ui";
import type { AboutPageContent } from "@/content/about";
import { assetUrl } from "@/media";

/*
  The About Us sections that need no interactivity, so they stay server-rendered.
*/

/*
  The hero pill: a red heart carrying this page's "46", the words, then three dots.
  The artwork is owned by the code, the way the other section icons are.
*/
function HeroPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-action/20 bg-tint px-4 py-2 text-[0.75rem] font-medium tracking-[0.14em] text-action uppercase">
      <span
        aria-hidden="true"
        className="relative grid size-5 shrink-0 origin-center animate-heartbeat place-items-center"
      >
        <svg viewBox="0 0 24 24" className="absolute inset-0 size-full fill-action">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="relative -translate-y-px text-[0.375rem] leading-none text-white">46</span>
      </span>

      {children}

      <span aria-hidden="true" className="flex items-center gap-1">
        <span className="size-1 origin-center animate-dot-wave rounded-full bg-action" />
        <span className="size-1 origin-center animate-dot-wave rounded-full bg-action [animation-delay:-1350ms]" />
        <span className="size-1 origin-center animate-dot-wave rounded-full bg-action [animation-delay:-1200ms]" />
      </span>
    </span>
  );
}

export function AboutHero({ content }: { content: AboutPageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      {/*
        Same as the home and Reports heroes: on phones the photo is repeated inside the
        card, so the background becomes a blurred, darkened wash. Scaled up a touch so the
        blur leaves no soft light edges.
      */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="h-full w-full max-sm:scale-110 max-sm:blur-md">
          <Media src={content.image} alt={content.imageAlt} sizes="100vw" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-ink/35 sm:hidden" />
      </div>

      <div className="container-page pt-28 pb-12 max-sm:px-2.5 lg:min-h-[36.75rem] lg:pt-[7.5rem] lg:pb-[6rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-4 pt-10 shadow-raised sm:p-7 lg:p-8">
          <HeroPill>{content.eyebrow}</HeroPill>

          <h1 className="mt-3 text-[2.125rem] leading-[1.08] font-semibold max-sm:px-1 sm:mt-4 sm:text-[2.75rem] sm:leading-[1.15] lg:text-[3.125rem]">
            {content.headingStart}
            <br />
            <span className="accent">{content.headingAccent}</span>
          </h1>

          <p className="mt-4 max-w-[34rem] border-l-4 border-action bg-tint px-3 py-2 text-[0.9375rem] leading-relaxed text-ink sm:mt-5 sm:px-4 sm:py-3 sm:text-[1rem] sm:leading-normal">
            {content.body}
          </p>

          <ButtonLink
            href="#impact"
            className="mt-5 hover:shadow-raised max-sm:ml-1 sm:min-h-12 sm:px-8 sm:text-base"
          >
            {content.cta}
          </ButtonLink>

          <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl sm:hidden">
            <Media src={content.image} alt="" sizes="(max-width: 640px) 100vw, 1px" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Timeline({ content }: { content: AboutPageContent["timeline"] }) {
  return (
    <section className="bg-surface py-14 md:py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
        </h2>

        <p className="mt-3 text-center text-[0.9375rem] text-body">{content.subtitle}</p>

        {/*
          From md up: a narrow centre line, the cards alternating either side, each with a
          dot on it. Below md, as on the reference site: the line runs down the left, and
          every card sits to its right with a dot and a short stub.
        */}
        <div className="relative mx-auto mt-10 max-w-[52rem] md:mt-14">
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 w-px -translate-x-1/2 bg-action/25 md:left-1/2 md:bg-line"
          />

          <ul className="flex flex-col gap-8 md:gap-12">
            {content.items.map((item, index) => (
              <li key={index} className="relative pl-10 md:grid md:grid-cols-2 md:gap-24 md:pl-0">
                {/*
                  The stub that ties the card to the line. On md up it is half the column gap,
                  so it reaches the card's edge exactly; below md it spans the left indent.
                */}
                <span
                  aria-hidden="true"
                  className={`absolute top-[2.375rem] left-4 h-px w-6 bg-action/25 md:w-12 md:bg-line ${
                    index % 2 === 0 ? "md:left-1/2" : "md:right-1/2 md:left-auto"
                  }`}
                />

                {/* The marker that sits on the line. */}
                <span
                  aria-hidden="true"
                  className="absolute top-8 left-4 size-3 -translate-x-1/2 rounded-full border-2 border-surface bg-action ring-1 ring-action md:left-1/2 md:ring-line"
                />

                <article
                  className={`overflow-hidden rounded-lg border border-line bg-surface shadow-sm md:rounded-card md:border-0 md:shadow-card ${
                    index % 2 === 0 ? "md:col-start-2" : "md:col-start-1"
                  }`}
                >
                  <div className="aspect-[7/3] w-full md:aspect-[5/2]">
                    <Media
                      src={item.image}
                      alt={item.imageAlt}
                      sizes="(min-width: 768px) 30vw, 90vw"
                    />
                  </div>

                  <div className="px-3.5 pt-4 pb-6 md:p-2.5">
                    <p className="text-[1.25rem] font-semibold tracking-[0.08em] text-action md:text-[1.0625rem] md:tracking-normal">
                      {item.year}
                    </p>
                    <p className="mt-2 text-[1rem] leading-snug text-body md:mt-1.5 md:text-[0.875rem]">
                      {item.text}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ImpactGrid({ content }: { content: AboutPageContent["impact"] }) {
  return (
    <section id="impact" className="scroll-mt-28 bg-page py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        {/*
          Two per row from 431 up, one per row below that — see .about-stats in
          styles/responsive.css. The card holds only a tag, a number and a line, so stacking them
          all the way up wasted space. The number and the padding come down a step to suit the
          narrower column, and return to their original size from sm.
        */}
        <ul className="about-stats mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {content.stats.map((stat, index) => (
            <li
              key={index}
              className="flex flex-col rounded-card bg-surface p-4 shadow-card sm:p-5"
            >
              <span className="self-start rounded-full bg-page px-3 py-1 text-[0.75rem] font-bold text-body">
                {stat.tag}
              </span>

              <CountUp
                value={stat.value}
                className="mt-4 text-[1.75rem] leading-none font-extrabold text-action sm:text-[2.25rem]"
              />

              <p className="mt-2 text-[0.875rem] leading-snug text-body">{stat.caption}</p>

              {stat.note.length > 0 ? (
                <p className="mt-2 text-[0.75rem] leading-snug text-body italic">{stat.note}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Stories({ content }: { content: AboutPageContent["stories"] }) {
  return (
    <section className="bg-page py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
        </h2>

        {/* Narrower than the container and taller, so each card is a portrait shape. */}
        <ul className="mx-auto mt-12 grid max-w-[68rem] gap-6 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <li key={index} className="relative isolate overflow-hidden rounded-card bg-ink">
              <div className="absolute inset-0 -z-10">
                <Media src={item.image} alt={item.imageAlt} sizes="(min-width: 1024px) 30vw, 90vw" />
              </div>

              {/*
                The fade that keeps the words readable. It reaches higher and runs darker than
                before, because the words sit over the lower third of the card at every width.
              */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink via-ink/70 to-transparent"
              />

              <div className="relative flex min-h-[30rem] flex-col justify-end p-6">
                <p className="text-[1.125rem] font-semibold text-white">{item.name}</p>
                <p className="mt-1 text-[0.8125rem] text-white/70">{item.role}</p>
                <StoryQuote quote={item.quote} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Partners({ content }: { content: AboutPageContent["partners"] }) {
  /* The row is printed twice so the scroll loops without a visible jump. */
  const row = [...content.logos, ...content.logos];

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          <span className="accent">{content.headingStart}</span> {content.headingAccent}
        </h2>

        <p className="mt-3 text-center text-[0.9375rem] text-body">{content.subtitle}</p>
      </div>

      {/* The slider. It scrolls on its own and pauses when the pointer is over it. */}
      <div className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <ul className="flex w-max animate-logo-scroll items-center gap-16 hover:[animation-play-state:paused]">
          {row.map((logo, index) => (
            <li
              key={index}
              aria-hidden={index >= content.logos.length}
              className="flex h-16 w-[11rem] shrink-0 items-center justify-center"
            >
              {/*
                A plain image, not next/image: one partner logo is an SVG, which next/image
                refuses by default, and the logos must not be cropped.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={assetUrl(logo.image)} alt={logo.name} className="max-h-16 w-full object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* A small helper so the page file stays short. */
