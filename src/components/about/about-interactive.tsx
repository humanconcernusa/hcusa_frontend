"use client";

import { useRef, useState } from "react";
import { ButtonLink, Eyebrow, Media } from "@/components/ui";
import type { AboutPageContent } from "@/content/about";

/*
  The About Us sections that hold state: the three tabs and the accordion. The figure that
  counts up in the impact grid lives in count-up.tsx, because the counters band shares it.
*/

export function WhatDrivesUs({ content }: { content: AboutPageContent["drives"] }) {
  const [active, setActive] = useState(0);
  const tab = content.tabs[active];

  return (
    <section className="bg-page py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        {/*
          One row at every width, as a segmented control. Three stacked full-width buttons read
          as three separate actions rather than one control with a choice in it.
        */}
        <div role="tablist" className="mt-10 grid grid-cols-3 gap-2 sm:gap-3">
          {content.tabs.map((item, index) => {
            const isActive = index === active;

            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(index)}
                className={`min-h-11 rounded-full border border-transparent px-2 text-[0.875rem] font-semibold whitespace-nowrap transition-colors sm:min-h-12 sm:px-4 sm:text-[1rem] ${
                  isActive ? "bg-tint text-ink" : "bg-surface text-ink hover:bg-page"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-8 rounded-card bg-surface p-6 shadow-card lg:grid-cols-2 lg:p-8">
          <div className="min-h-[14rem] overflow-hidden rounded-lg">
            <Media src={tab.image} alt={tab.imageAlt} sizes="(min-width: 1024px) 520px, 90vw" />
          </div>

          <div>
            {tab.body.length > 0 ? (
              <p className="text-[1rem] leading-relaxed text-body">{tab.body}</p>
            ) : null}

            {tab.points.length > 0 ? (
              <ul className="flex flex-col gap-4">
                {tab.points.map((point, index) => {
                  /* The label before the colon carries the weight; the words after it do not. */
                  const colon = point.indexOf(":");
                  const label = colon >= 0 ? point.slice(0, colon + 1) : point;
                  const rest = colon >= 0 ? point.slice(colon + 1) : "";

                  return (
                    <li key={index} className="flex gap-3 text-[1rem] leading-relaxed text-body">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-ink"
                      />
                      <span>
                        <span className="font-bold">{label}</span>
                        {rest}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <ButtonLink href="/our-team" variant="darkHover" size="lg">
            {content.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/*
  A story's quote.

  The card is a fixed height with the photo behind it, so the words are held to three lines
  whatever the width, with the rest behind a button. That keeps the block inside the lower third
  of the card, over the darkest part of the wash, instead of climbing across the photo.
*/
export function StoryQuote({ quote }: { quote: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <p
        className={`mt-3 text-[0.875rem] leading-snug text-white/90 ${
          isOpen ? "" : "line-clamp-3"
        }`}
      >
        {quote}
      </p>

      {isOpen ? null : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-2 self-start text-[0.8125rem] font-semibold text-white underline underline-offset-4"
        >
          Read more
        </button>
      )}
    </>
  );
}

export function Approach({ content }: { content: AboutPageContent["approach"] }) {
  /* The first item starts open, as the live page has it. */
  const [openIndex, setOpenIndex] = useState(0);
  /* Which answers have been opened past their four-line preview, on a phone. */
  const [openBody, setOpenBody] = useState<number | null>(null);
  /* Which photo is in view. Only the gallery below lg uses it. */
  const [slide, setSlide] = useState(0);
  const gallery = useRef<HTMLUListElement>(null);

  function goToSlide(index: number) {
    const list = gallery.current;
    const item = list?.children[index] as HTMLElement | undefined;

    if (list && item) {
      list.scrollTo({ left: item.offsetLeft - list.offsetLeft, behavior: "smooth" });
    }
  }

  /* The slide nearest the middle of the row is the one being looked at. */
  function onGalleryScroll() {
    const list = gallery.current;
    if (!list) return;

    const middle = list.scrollLeft + list.clientWidth / 2;
    let nearest = 0;
    let shortest = Infinity;

    Array.from(list.children).forEach((child, index) => {
      const box = child as HTMLElement;
      const centre = box.offsetLeft - list.offsetLeft + box.clientWidth / 2;
      const distance = Math.abs(centre - middle);

      if (distance < shortest) {
        shortest = distance;
        nearest = index;
      }
    });

    setSlide(nearest);
  }

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <p className="mt-3 text-center text-[0.9375rem] text-body">{content.subtitle}</p>

        {/*
          Stacked photos are three long blocks to scroll past on a phone, so below lg the row
          becomes a swipe instead: one photo at a time with the next showing at the edge, and a
          dot for each under it. From lg there is room for all three side by side again.
        */}
        <ul
          ref={gallery}
          onScroll={onGalleryScroll}
          className="approach-gallery mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible"
        >
          {content.images.map((image, index) => (
            <li
              key={index}
              className="aspect-[4/3] w-[85%] shrink-0 snap-center overflow-hidden rounded-card lg:w-auto lg:shrink"
            >
              <Media
                src={image.image}
                alt={image.imageAlt}
                sizes="(min-width: 1024px) 30vw, (min-width: 820px) 250px, 85vw"
              />
            </li>
          ))}
        </ul>

        <ul className="approach-dots mt-4 flex justify-center gap-2 lg:hidden">
          {content.images.map((_image, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Photo ${index + 1} of ${content.images.length}`}
                aria-current={index === slide ? "true" : undefined}
                className={`block size-2.5 rounded-full transition-colors ${
                  index === slide ? "bg-action" : "bg-line"
                }`}
              />
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-4">
          {content.items.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <div key={index} className="overflow-hidden rounded-card bg-page">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span
                    className={`text-[1.125rem] font-medium ${isOpen ? "text-action" : "text-ink"}`}
                  >
                    {item.title}
                  </span>

                  <span aria-hidden="true" className="text-[1.25rem] text-action">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/*
                  The panel stays mounted and its row is eased between 0fr and 1fr, so the
                  answer slides open and closed rather than appearing in one jump.
                */}
                <div
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/*
                      On a phone an answer runs to a screenful on its own, so it is held to four
                      lines with the rest behind a button. From sm there is room for all of it, so
                      no button is drawn and nothing is clipped.
                    */}
                    <p
                      className={`px-6 text-[0.9375rem] leading-relaxed text-body ${
                        openBody === index ? "pb-6" : "max-sm:line-clamp-4 max-sm:pb-2 sm:pb-6"
                      }`}
                    >
                      {item.body}
                    </p>

                    {openBody === index ? null : (
                      <button
                        type="button"
                        onClick={() => setOpenBody(index)}
                        className="mb-6 ml-6 text-[0.875rem] font-semibold text-action underline underline-offset-4 sm:hidden"
                      >
                        Read more
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
