import Image from "next/image";
import { Fragment } from "react";
import type { ReactNode } from "react";
import { GlobeIcon, HeartIcon, YOUTH_ICONS } from "@/components/youth/youth-icons";
import type { YouthPageContent } from "@/content/youth";

/* The pink pill the reference uses above Program Benefits, Program Timeline, How It Works and FAQ. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex justify-center">
      <span className="rounded-full bg-tint px-4 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-action uppercase">
        {children}
      </span>
    </p>
  );
}

const headingClass = "text-center text-[2rem] leading-[1.1] font-semibold lg:text-[3rem]";

/* The long introduction, with the Qur'anic quote set in after the fifth paragraph. */
export function Intro({ content }: { content: YouthPageContent["intro"] }) {
  return (
    <section id="intro" className="scroll-mt-28 bg-surface py-20 lg:py-28">
      <div className="container-page max-w-[62rem]">
        <h2 className={headingClass}>
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        {content.paragraphs.map((paragraph, index) => (
          <Fragment key={paragraph}>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-body">{paragraph}</p>

            {index === 4 ? (
              <blockquote className="mt-6 border-l-2 border-action pl-5">
                <p className="text-[0.9375rem] leading-relaxed text-body italic">
                  &ldquo;{content.quote}&rdquo;
                </p>
                <p className="mt-2 text-[0.8125rem] text-body italic">({content.quoteSource})</p>
              </blockquote>
            ) : null}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

/* The six benefit cards, each with its glyph in a pink tile. */
export function Benefits({ content }: { content: YouthPageContent["benefits"] }) {
  return (
    <section className="bg-page py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className={`mt-4 ${headingClass}`}>
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        {content.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="mx-auto mt-4 max-w-[52rem] text-center text-[0.9375rem] leading-relaxed text-body"
          >
            {paragraph}
          </p>
        ))}

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {content.cards.map((card) => {
            const Icon = YOUTH_ICONS[card.icon] ?? HeartIcon;

            return (
              <li key={card.title} className="rounded-card bg-surface p-6 shadow-card">
                <span className="grid size-11 place-items-center rounded-lg bg-tint">
                  <Icon className="size-6 text-action" />
                </span>

                <p className="mt-4 text-[1.0625rem] font-semibold text-action">{card.title}</p>

                {card.intro ? (
                  <p className="mt-2 text-[0.9375rem] font-semibold text-ink">{card.intro}</p>
                ) : null}

                {card.body ? (
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">{card.body}</p>
                ) : null}

                {card.bullets ? (
                  <ul className="mt-3 space-y-2">
                    {card.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-body"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1 shrink-0 rounded-full bg-body"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {card.after ? (
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{card.after}</p>
                ) : null}

                {card.note ? (
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-body italic">
                    {card.note}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* The convention band: a photo behind a dark veil, centred. */
export function Turkey({ content }: { content: YouthPageContent["turkey"] }) {
  return (
    <section className="relative isolate bg-inverse py-20 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src={content.image}
          alt={content.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/72" />
      </div>

      <div className="container-page text-center">
        <span className="inline-flex rounded-full bg-surface px-4 py-1.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-action uppercase">
          {content.eyebrow}
        </span>

        <h2 className={`mt-4 text-white ${headingClass}`}>
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <p className="mx-auto mt-4 max-w-[58rem] text-[0.9375rem] leading-relaxed text-white/80">
          {content.body}
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {content.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[0.9375rem] font-medium text-white">
              <GlobeIcon className="size-4 text-action" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* The three phases. */
export function Phases({ content }: { content: YouthPageContent["phases"] }) {
  return (
    <section className="bg-page py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className={`mt-4 ${headingClass}`}>
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
        </h2>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {content.cards.map((card) => {
            const Icon = YOUTH_ICONS[card.icon] ?? HeartIcon;

            return (
              <li
                key={card.title}
                className="flex flex-col items-center rounded-card bg-surface px-6 py-8 text-center shadow-card"
              >
                <span className="grid size-11 place-items-center rounded-lg bg-tint">
                  <Icon className="size-6 text-action" />
                </span>

                <p className="mt-4 text-[1.0625rem] font-semibold text-action">{card.title}</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{card.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* More than a Program, on black. */
export function MoreThan({ content }: { content: YouthPageContent["more"] }) {
  return (
    <section className="bg-ink py-20 lg:py-28">
      <div className="container-page text-center">
        <h2 className="text-[2rem] leading-[1.1] font-semibold text-white lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
        </h2>

        {content.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="mx-auto mt-5 max-w-[58rem] text-[0.9375rem] leading-relaxed text-white/75"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

/* The closing band: the photo behind a red veil, text only. */
export function Closing({ content }: { content: YouthPageContent["closing"] }) {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-card px-6 py-14 text-center lg:px-10 lg:py-20">
          <div className="absolute inset-0 -z-10">
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-action/85" />
          </div>

          <h2 className="text-[1.75rem] leading-tight font-semibold text-white lg:text-[2.5rem]">
            {content.heading}
          </h2>

          <p className="mx-auto mt-4 max-w-[52rem] text-[0.9375rem] leading-relaxed text-white/90">
            {content.body}
          </p>
        </div>
      </div>
    </section>
  );
}
