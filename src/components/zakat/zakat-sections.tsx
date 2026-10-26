"use client";

import Image from "next/image";
import { useState } from "react";
import { DonateButton } from "@/components/donate/donate-button";
import { Button, ButtonLink } from "@/components/ui";
import type { ZakatPageContent } from "@/content/zakat";
import { ZakatCalculator } from "./zakat-calculator";

/*
  The four bands this page does not share: What is Zakat?, Who Can Receive Zakat?, the
  calculator banner and Where Your Zakat Goes.
*/

/* The four card icons, in the order the cards run. */
const WHY_ICONS = [
  "/images/zakat/why-pillar.svg",
  "/images/zakat/why-purify.svg",
  "/images/zakat/why-welfare.svg",
  "/images/zakat/why-empower.svg",
];

/* The small mark that repeats beside each of the eight categories. */
const CATEGORY_ICON = "/images/zakat/category.svg";

/*
  The calculator opens from two places, so the button and the panel it opens travel together.
  Only one is ever open, because each keeps its own panel.
*/
function CalculatorButton({
  label,
  variant,
  rates,
}: {
  label: string;
  variant: "dark" | "primary";
  rates: ZakatPageContent["calculator"];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" variant={variant} size="lg" onClick={() => setIsOpen(true)}>
        {label}
      </Button>
      <ZakatCalculator open={isOpen} onClose={() => setIsOpen(false)} rates={rates} />
    </>
  );
}

export function WhyZakat({
  content,
  rates,
}: {
  content: ZakatPageContent["why"];
  rates: ZakatPageContent["calculator"];
}) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
            {content.eyebrow}
          </p>

          {/* The heading is one line here, so the red word sits inside it. */}
          <h2 className="mt-4 text-[2.25rem] leading-[1.1] font-semibold lg:text-[3rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>
            {content.headingEnd}
          </h2>

          <p className="mt-4 text-[0.9375rem] text-body">{content.lead}</p>

          <p className="mt-4 text-[1rem] leading-relaxed text-body">{content.body}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <CalculatorButton label={content.cta} variant="dark" rates={rates} />
            <ButtonLink href="#who" variant="secondary" size="lg">
              {content.secondCta}
            </ButtonLink>
          </div>
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
              <img src={WHY_ICONS[index % WHY_ICONS.length]} alt="" className="size-12" />
              <p className="text-[1rem] font-medium text-ink">{card.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhoCanReceive({ content }: { content: ZakatPageContent["who"] }) {
  return (
    /* The eight categories are the target of the "See who receives Zakat" button. */
    <section id="who" className="bg-surface py-20 lg:py-28">
      <div className="container-page">
        <p className="text-center text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
          {content.eyebrow}
        </p>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
          {content.headingEnd}
        </h2>

        {/*
          One hairline grid: the panel carries the line colour and the cells sit on it with a
          single pixel between them, so the gaps read as the dividers.
        */}
        <ul className="mt-12 grid gap-px overflow-hidden rounded-card bg-surface grid-cols-2 lg:grid-cols-4">
          {content.items.map((item, index) => (
            <li
              key={item.name}
              className="flex items-start justify-between gap-4 bg-page md:p-6 p-4 transition-[background-color,box-shadow] duration-200 hover:bg-surface hover:shadow-card hover:ring-1 hover:ring-action/25"
            >
              <div>
                <p className="md:text-[1.75rem] text-[26px] leading-none font-semibold text-action/25">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 text-[1rem] font-semibold text-action">{item.name}</p>
                <p className="mt-1 md:text-[0.9375rem] text-sm text-body">{item.caption}</p>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CATEGORY_ICON} alt="" className="mt-1 md:size-6 size-4 shrink-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CalculatorBanner({ content }: { content: ZakatPageContent["calculator"] }) {
  return (
    <section className="bg-surface pt-6 lg:pt-8">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-card bg-ink">
          {/* The page's own hero photo, kept dark so the words carry. */}
          <div className="absolute inset-0 -z-10 opacity-40">
            <Image src="/images/zakat/hero.png" alt="" fill sizes="100vw" className="scale-110 object-cover blur-sm" />
          </div>

          <div className="flex flex-col items-center px-6 py-14 text-center lg:py-16">
            <h2 className="text-[2rem] leading-[1.1] font-semibold text-white lg:text-[2.75rem]">
              {content.headingStart}{" "}
              <span className="accent text-brand">{content.headingAccent}</span>
            </h2>

            <p className="mt-3 text-[1rem] text-white/85">{content.body}</p>

            <div className="mt-7">
              <CalculatorButton label={content.cta} variant="primary" rates={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhereZakatGoes({ content }: { content: ZakatPageContent["where"] }) {
  return (
    <section className="bg-surface pt-8 pb-20 md:pt-12 md:pb-28">
      <div className="container-page grid items-center gap-12 md:gap-8 md:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-card">
          <Image
            src={content.image}
            alt={content.imageAlt}
            width={496}
            height={512}
            sizes="(min-width: 1024px) 480px, 90vw"
            className="h-auto w-full"
          />
        </div>

        <div>
          <p className="text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
            {content.eyebrow}
          </p>

          <h2 className="mt-4 md:mt-2 lg:mt-4 text-[2.25rem] leading-[1.1] font-semibold lg:text-[3rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
            {content.headingEnd}
          </h2>

          <p className="mt-4 md:mt-2 lg:mt-4 text-[0.9375rem] text-body">{content.lead}</p>

          <ul className="mt-4 md:mt-2 lg:mt-4 flex flex-col gap-2.5">
            {content.points.map((point) => (
              <li key={point} className="flex gap-3 text-[1rem] text-body">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <DonateButton formId={content.form} variant="dark" size="lg" className="mt-8 md:mt-2 lg:mt-8">
            {content.cta}
          </DonateButton>
        </div>
      </div>
    </section>
  );
}
