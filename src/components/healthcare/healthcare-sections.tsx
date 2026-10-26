"use client";

import { useState } from "react";
import { Button, Media, PlayButton } from "@/components/ui";
import { CountUp } from "@/components/count-up";
import { DonateButton } from "@/components/donate/donate-button";
import type { HealthcarePageContent } from "@/content/healthcare";
import Image from "next/image";

/*
  The live page draws the four card icons as red line drawings. Its own icon files are not
  among the saved assets, so these are drawn to match rather than copied. Replace them with
  the real artwork if it is ever saved.
*/
function WhyIcon({ index }: { index: number }) {
  const stroke = "size-12 fill-none stroke-action stroke-[1.5]";

  if (index === 0) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className={stroke}>
        <rect x="6" y="16" width="36" height="26" rx="6" />
        <path d="M19 16v-3a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v3" strokeLinecap="round" />
        <path d="M24 24v10M19 29h10" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className={stroke}>
        <path d="M20 14h8v-3a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2z" strokeLinejoin="round" />
        <path d="M16 26a10 10 0 0 1 16 0v10a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z" />
        <path d="M22 31h4" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" className={stroke}>
        <circle cx="18" cy="30" r="8" />
        <circle cx="32" cy="19" r="6" />
        <circle cx="34" cy="34" r="5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={stroke}>
      <rect x="8" y="18" width="32" height="18" rx="9" />
      <path d="M20 18v18" strokeLinecap="round" />
      <path d="M28 23h-3a2.5 2.5 0 0 0 0 5h2a2.5 2.5 0 0 1 0 5h-3" strokeLinecap="round" />
    </svg>
  );
}

export function WhyHealthcare({ content }: { content: HealthcarePageContent["why"] }) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
            {content.eyebrow}
          </p>

          {/* The live page breaks the heading after the red word. */}
          <h2 className="mt-4 text-[2.25rem] leading-[1.1] font-semibold lg:text-[3rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>
            <br />
            {content.headingEnd}
          </h2>

          <p className="mt-4 text-[0.9375rem] text-body">{content.lead}</p>

          <p className="mt-4 text-[1rem] leading-relaxed text-body">{content.body}</p>

          <Button type="button" variant="dark" size="lg" className="mt-8">
            {content.cta}
          </Button>
        </div>

        <ul className="grid grid-cols-2 gap-5">
          {content.cards.map((card, index) => (
            <li
              key={index}
              className="flex flex-col items-center gap-4 rounded-card bg-surface px-4 py-10 text-center shadow-card"
            >
              <WhyIcon index={index} />
              <p className="text-[1rem] font-medium text-ink">{card.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function StoriesVideo({
  content,
  className = "py-20 lg:py-28",
}: {
  content: HealthcarePageContent["stories"];
  /* The band's vertical padding, overridable so one page can tighten it. */
  className?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className={`bg-page ${className} py-14 lg:py-16`}>
      <p className="text-center text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
        {content.eyebrow}
      </p>

      <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
        {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
        {content.headingEnd}
      </h2> 
      <div className="container-page mt-10 md:mt-14">
        <div className="relative h-[13rem] overflow-hidden rounded-card md:h-[25.75rem] lg:h-[30.75rem]">
          {isPlaying ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${content.videoId}?autoplay=1&rel=0`}
              title="Human Concern USA story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <>
              <Media
                src={content.image}
                alt={content.imageAlt}
                sizes="(min-width: 1440px) 1400px, 100vw"
              />
              <PlayButton
                label="Play the Human Concern USA story"
                onClick={() => setIsPlaying(true)}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export function CounterBand({ content }: { content: HealthcarePageContent["counters"] }) {
  const figures = [
    { value: content.firstValue, label: content.firstLabel, caption: content.firstCaption },
    { value: content.secondValue, label: content.secondLabel, caption: content.secondCaption },
  ];

  return (
    <section className="bg-action py-14">
      {/* Two narrow cards, centred as a pair, the way the live page has them. */}
      <div className="container-page flex fmd:lex-wrap flex-row justify-center gap-3 md:gap-5">
        {figures.map((figure, index) => (
          <div
            key={index}
            className="flex w-44 flex-col items-center rounded-card bg-surface md:px-6 px-3 md:py-10 py-5 text-center shadow-card sm:w-auto sm:min-w-[15rem] lg:min-w-[17rem]"
          >
            <p className="text-[0.8125rem] text-body">{figure.caption}</p>
            {/* Climbs to the figure the first time the band is scrolled to. */}
            <CountUp
              value={figure.value}
              className="mt-1 md:text-4xl text-[28px] leading-none font-semibold text-action"
            />
            <p className="mt-2 text-[0.875rem] text-body">{figure.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GivingLevels({
  content,
  className = "py-20 lg:py-28",
}: {
  content: HealthcarePageContent["giving"];
  /* The band's vertical padding, overridable so one page can drop it. */
  className?: string;
}) {
  return (
    <section id="giving" className={`bg-page ${className}`}>
      <div className="container-page">
        <p className="text-center text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
          {content.eyebrow}
        </p>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          <span className="accent">{content.headingStart}</span> {content.headingAccent}
        </h2>

        <ul className="mt-12 grid gap-5 grid-cols-2 lg:grid-cols-4">
          {content.levels.map((level, index) => (
            <li key={index} className="flex flex-col rounded-card bg-surface md:p-6 p-5 shadow-card">
              {/* The amount and the heart sit on one row, amount left and heart right. */}
              <div className="flex items-start justify-between gap-4">
                <p className="text-[1.5rem] font-semibold text-action">${level.amount}</p>

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 fill-none stroke-action stroke-[1.6]"
                >
                  <path
                    d="M12 20.1l-1.1-1C6.6 15.2 4.2 13 4.2 10a4.3 4.3 0 0 1 4.3-4.3c1.3 0 2.5.6 3.5 1.6 1-1 2.2-1.6 3.5-1.6A4.3 4.3 0 0 1 19.8 10c0 3-2.4 5.2-6.7 9.1z"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="mt-3 flex-1 text-sm md:text-[0.9375rem] leading-snug text-body">{level.text}</p>

              <DonateButton formId={level.form} variant="dark" className="mt-6 w-full">
                {level.cta}
              </DonateButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* The four icons beside the points, in the order the live page has them. */
const CHOOSE_ICONS = [
  // A shield with a tick, for transparency.
  <>
    <path
      key="shield"
      d="M12 3.5 5.5 6v6c0 4 2.7 6.9 6.5 8.5 3.8-1.6 6.5-4.5 6.5-8.5V6z"
      strokeLinejoin="round"
    />
    <path key="tick" d="M9.5 12l1.8 1.8 3.2-3.6" strokeLinecap="round" strokeLinejoin="round" />
  </>,
  // A cross in a rounded square, for medical partners.
  <>
    <rect key="box" x="4" y="4" width="16" height="16" rx="5" />
    <path key="cross" d="M12 9v6M9 12h6" strokeLinecap="round" />
  </>,
  // A bolt, for rapid response.
  <path key="bolt" d="M13 3 6 13h5l-1 8 7-10h-5z" strokeLinejoin="round" />,
  // A globe, for serving globally.
  <>
    <circle key="circle" cx="12" cy="12" r="8.5" />
    <path key="lines" d="M3.5 12h17M12 3.5c2.6 2.5 2.6 14.5 0 17M12 3.5c-2.6 2.5-2.6 14.5 0 17" />
  </>,
];

export function ChooseBand({
  content,
  formId = "healthcare-1",
}: {
  content: HealthcarePageContent["choose"];
  /* The About page shares this section but opens its own popup. */
  formId?: string;
}) {
  /* The first point is the pill; the rest are the four boxes. */
  const [pill, ...points] = content.points;

  /* The first word of the tail stays on the heading's first line; the rest drops below. */
  const [tailLead, ...tailRest] = content.headingEnd.split(" ");

  return (
    <section className="bg-inverse py-14 lg:py-20">
      <div className="container-page">
        <h2 className="text-center text-[2.25rem] leading-[1.1] font-semibold text-white lg:text-[3.5rem]">
          {content.headingStart} <span className="accent text-brand">{content.headingAccent}</span>{" "}
          {tailLead}
          {tailRest.length > 0 ? (
            <>
              <br />
              {tailRest.join(" ")}
            </>
          ) : null}
        </h2>

        {/* One white card, narrower and centred, holding the points left and photo right. */}
        <div className="mx-auto mt-8 grid max-w-[1060px] gap-5 rounded-card bg-surface p-4 shadow-raised lg:grid-cols-[1.7fr_1fr] lg:p-5">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-leaf/20 bg-leaf/10 px-3.5 py-1.5 text-[0.8125rem] font-medium text-leaf">
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 shrink-0">
                <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="8" cy="8" r="2.5" fill="currentColor" />
              </svg>
              {pill}
            </p>

            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {points.map((point, index) => (
                <li
                  key={index}
                  className="relative flex items-start gap-2.5 rounded-2xl border border-action/25 p-4"
                >
                  {/* The bracket that marks the box's top-left corner. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 left-0 size-8 animate-corner-pulse rounded-tl-lg border-t-[3px] border-l-[3px] border-action/60"
                  />

                  {/* The icon inside a dashed ring that turns slowly on the spot. */}
                  <span className="relative grid size-11 shrink-0 place-items-center">
                    <svg
                      viewBox="0 0 44 44"
                      aria-hidden="true"
                      className="absolute inset-0 size-full animate-ring-spin fill-none stroke-action"
                    >
                      <circle
                        cx="22"
                        cy="22"
                        r="19"
                        strokeWidth="1"
                        strokeDasharray="5 4"
                        strokeLinecap="round"
                      />
                    </svg>

                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="relative size-5 fill-none stroke-action stroke-[1.6]"
                    >
                      {CHOOSE_ICONS[index % CHOOSE_ICONS.length]}
                    </svg>
                  </span>

                  <div className="relative min-w-0">
                    <p className="text-[0.9375rem] leading-snug font-medium text-ink">{point}</p>
                    {/* The rule under each point, running the width of the box. Each one
                        starts a little after the one before, so they do not move together. */}
                    <span
                      className="mt-2 block h-0.5 w-full origin-left animate-line-grow rounded-full bg-action"
                      style={{ animationDelay: `${index * 0.5}s` }}
                      aria-hidden="true"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-full min-h-[12rem] overflow-hidden rounded-2xl">
            <Media
              src={content.image}
              alt={content.imageAlt}
              sizes="(min-width: 1024px) 420px, 90vw"
            />
          </div>
        </div>

        {/* The Reports page shares this band but has no button, so an empty label hides it. */}
        {content.cta.length > 0 ? (
          <div className="mt-6 flex justify-center">
            <DonateButton formId={formId} variant="secondary" size="lg">
              {content.cta}
            </DonateButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
