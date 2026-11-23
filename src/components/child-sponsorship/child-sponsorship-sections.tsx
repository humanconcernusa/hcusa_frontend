"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { DonateButton } from "@/components/donate/donate-button";
import type { ChildSponsorshipPageContent } from "@/content/child-sponsorship";
import { assetUrl } from "@/media";

/*
  The three bands this page does not share: the four-card "Why" band, the map of the countries
  the programme runs in, and the questions list.

  The map is loaded with ssr: false, because Leaflet needs the browser.
*/
const SponsorshipMap = dynamic(
  () => import("./sponsorship-map").then((module) => module.SponsorshipMap),
  { ssr: false, loading: () => <div className="h-full w-full bg-page" /> },
);

/* The four card icons, in the order the cards run. */
const WHY_ICONS = [
  "/images/child-sponsorship/why-education.svg",
  "/images/child-sponsorship/why-healthcare.svg",
  "/images/child-sponsorship/why-nutrition.svg",
  "/images/child-sponsorship/why-social.svg",
];

export function WhySponsor({ content }: { content: ChildSponsorshipPageContent["why"] }) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
            {content.eyebrow}
          </p>

          <h2 className="mt-4 text-[2.25rem] leading-[1.1] font-semibold lg:text-[3rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>
            <br />
            {content.headingEnd}
          </h2>

          {/* The short line above the paragraph is optional, so an empty one leaves no gap. */}
          {content.lead.length > 0 ? (
            <p className="mt-4 text-[0.9375rem] text-body">{content.lead}</p>
          ) : null}

          <p className="mt-4 text-[1rem] leading-snug text-body">{content.body}</p>

          <DonateButton formId={content.form} variant="dark" size="lg" className="mt-8">
            {content.cta}
          </DonateButton>
        </div>

        <ul className="grid grid-cols-2 gap-5">
          {content.cards.map((card, index) => (
            <li
              key={index}
              className="flex flex-col items-center gap-4 rounded-card bg-surface px-4 py-10 text-center shadow-card"
            >
              {/* A plain image, not next/image: these are SVGs, which next/image refuses
                  by default. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={assetUrl(WHY_ICONS[index % WHY_ICONS.length])} alt="" className="size-12" />
              <p className="text-[1rem] font-medium text-ink">{card.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function GlobalLocations({ content }: { content: ChildSponsorshipPageContent["global"] }) {
  return (
    <section className="bg-page py-20 lg:py-28">
      <div className="container-page">
        {/* One white card holding the words and the map, as the design has it. */}
        <div className="mx-auto max-w-[76rem] rounded-card bg-surface px-6 py-12 shadow-card lg:px-10 lg:py-14">
          <h2 className="text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
            {content.headingEnd}
          </h2>

          <p className="mx-auto mt-4 max-w-[54rem] text-center text-[1rem] leading-snug text-body">
            {content.body}
          </p>

          {/* The map fills this box; Leaflet needs a real height to draw into. */}
          <div className="relative mt-10 h-[22rem] overflow-hidden rounded-2xl lg:h-[26rem]">
            <SponsorshipMap />

            {/* The key, over the map's bottom left, above Leaflet's own panes. */}
            <p className="absolute bottom-3 left-4 z-[650] flex items-center gap-2 rounded-full bg-surface/90 px-3 py-1 text-[0.75rem] text-body">
              <span aria-hidden="true" className="size-2 rounded-full bg-action" />
              Sponsor countries
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ content }: { content: ChildSponsorshipPageContent["faq"] }) {
  /* The first question starts open, as the live page has it. */
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page">
        <h2 className="max-w-[62rem] text-[2rem] leading-tight font-semibold lg:text-[2.5rem]">
          {content.heading}
        </h2>

        <ul className="mt-8 flex max-w-[62rem] flex-col">
          {content.items.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <li key={index} className="border-b border-divider">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-start gap-2.5 py-5 text-left"
                >
                  <span aria-hidden="true" className="text-[1rem] leading-snug text-action">
                    {isOpen ? "−" : "+"}
                  </span>
                  <span className="text-[1rem] leading-snug font-semibold text-action">
                    {item.question}
                  </span>
                </button>

                {/* The answer stays mounted and eases open, so it slides rather than jumps. */}
                <div
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-[0.9375rem] leading-snug text-body">{item.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
