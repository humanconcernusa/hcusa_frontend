"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ButtonLink, Media } from "@/components/ui";
import type { ReportsPageContent } from "@/content/reports";

/*
  The Reports page sections. The list is an accordion, so this file is a client component.

  The map is loaded with ssr: false, because Leaflet needs the browser.
*/
const ReportsMap = dynamic(() => import("./reports-map").then((module) => module.ReportsMap), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-page" />,
});

export function ReportsHero({ content }: { content: ReportsPageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      {/*
        Same as the home hero: on phones the photo is repeated inside the card, so the
        background becomes a blurred, darkened wash. Scaled up a touch so the blur leaves
        no soft light edges.
      */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="h-full w-full max-sm:scale-110 max-sm:blur-md">
          <Media
            src={content.image}
            alt={content.imageAlt}
            sizes="100vw"
            objectPosition="center top"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-ink/35 sm:hidden" />
      </div>

      <div className="container-page pt-28 pb-12 max-sm:px-2.5 lg:min-h-[37.25rem] lg:pt-[7.5rem] lg:pb-[6rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-4 pt-10 shadow-raised sm:p-7 lg:p-8">
          <h1 className="text-[2.25rem] leading-[1.05] font-semibold max-sm:px-1 sm:text-[2.75rem] sm:leading-none lg:text-[3.125rem]">
            {content.headingStart}
            <br />
            <span className="accent">{content.headingAccent}</span>
          </h1>

          <p className="mt-4 max-w-[34rem] border-l-4 border-action bg-tint px-3 py-2 text-[0.9375rem] leading-relaxed text-ink sm:mt-6 sm:px-4 sm:py-3 sm:text-[1rem] sm:leading-normal">
            {content.body}
          </p>

          <ButtonLink
            href="#reports"
            variant="primary"
            className="mt-5 hover:shadow-raised max-sm:ml-1 sm:mt-6 sm:min-h-12 sm:px-8 sm:text-base"
          >
            {content.cta}
          </ButtonLink>

          <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl sm:hidden">
            <Media
              src={content.image}
              alt=""
              sizes="(max-width: 640px) 100vw, 1px"
              objectPosition="center top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReportsIntro({ content }: { content: ReportsPageContent["intro"] }) {
  return (
    /* The list below shares this background, so the bottom padding stays small to join them. */
    <section className="bg-surface pt-20 pb-8 lg:pt-24 lg:pb-10">
      <div className="container-page">
        <div className="mx-auto max-w-[52rem] text-center">
          <h2 className="text-[2rem] leading-[1.15] font-semibold lg:text-[2.75rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>
          </h2>

          <div className="mt-6 flex flex-col gap-4 text-[1rem] leading-relaxed text-body">
            <p>{content.line1}</p>
            <p>{content.line2}</p>
            <p>{content.line3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReportsList({ content }: { content: ReportsPageContent["list"] }) {
  /* The first group starts open, as the live page has it. */
  const [openIndex, setOpenIndex] = useState(0);

  return (
    /* The same white as the "About Our Reports" block above, so the two read as one section. */
    <section id="reports" className="bg-surface pt-0 pb-20 lg:pb-28">
      <div className="container-page">
        <ul className="mx-auto flex max-w-[54rem] flex-col gap-4">
          {content.groups.map((group, index) => {
            const isOpen = index === openIndex;
            const hasLink = group.report.href.length > 0;

            return (
              <li key={index} className="overflow-hidden rounded-card bg-surface shadow-card">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 bg-tint px-6 py-5 text-left transition-colors hover:bg-page"
                >
                  <span
                    className={`text-[1.125rem] font-medium ${isOpen ? "text-action" : "text-ink"}`}
                  >
                    {group.title}
                  </span>

                  <span aria-hidden="true" className="text-[1.25rem] text-action">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/*
                  The panel stays mounted and its row is eased between 0fr and 1fr, so the
                  report slides open rather than appearing in one jump. While it is closed
                  it is inert, so nothing inside it can be reached or read.
                */}
                <div
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6">
                      {group.intro.length > 0 ? (
                        <p className="text-[0.9375rem] leading-relaxed text-body">{group.intro}</p>
                      ) : null}

                      {/*
                        Holds this group's reports. One today; two or three sit side by side once
                        there are more. The cover is capped so a portrait one cannot run taller
                        than the screen — see .report-card in styles/responsive.css.
                      */}
                      <div className="report-grid mt-6">
                        <article className="report-card w-full rounded-card border border-line bg-surface p-4 sm:p-5">
                          <div className="report-cover aspect-[4/5] w-full overflow-hidden rounded-lg bg-page">
                            <Media
                              src={group.report.image}
                              alt={group.report.imageAlt}
                              sizes="(min-width: 820px) 45vw, (min-width: 640px) 13rem, 90vw"
                            />
                          </div>

                          {/* Its own column, so the cover and the words sit side by side rather
                              than each line of text becoming a column of its own. */}
                          <div className="min-w-0 flex-1">
                            {/* No top margin where the cover sits beside it. */}
                            <p className="mt-4 text-[0.8125rem] font-medium text-action sm:mt-0">
                              {group.report.label}
                            </p>

                            <h3 className="mt-1 text-[1.125rem] font-semibold text-ink">
                              {group.report.title}
                            </h3>

                            {group.report.body.length > 0 ? (
                              <p className="mt-2 text-[0.875rem] leading-relaxed text-body">
                                {group.report.body}
                              </p>
                            ) : null}

                            {hasLink ? (
                              <ButtonLink
                                href={group.report.href}
                                variant="secondary"
                                className="mt-4 w-full border border-line"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Report
                              </ButtonLink>
                            ) : null}
                          </div>
                        </article>
                      </div>
                    </div>
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

export function GlobalMap({ content }: { content: ReportsPageContent["global"] }) {
  return (
    <section className="bg-surface py-14 sm:py-20 lg:py-28">
      {/* On phones the heading fits one line and the map runs nearly edge to edge. */}
      <div className="container-page max-sm:px-2.5">
        <h2 className="text-center text-[1.875rem] leading-[1.1] font-semibold sm:text-[2.25rem] lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        {/* The map fills this box; Leaflet needs a real height to draw into. */}
        <div className="mx-auto mt-6 h-[18.75rem] max-w-[62rem] overflow-hidden rounded-2xl bg-page sm:mt-12 sm:h-[24rem] sm:rounded-card lg:h-[28rem]">
          <ReportsMap />
        </div>
      </div>
    </section>
  );
}
