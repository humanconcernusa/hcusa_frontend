"use client";

import { useEffect, useState, type ReactNode } from "react";
import { DonateButton } from "@/components/donate/donate-button";
import { Callout, Media } from "@/components/ui";
import type { PrivacyPageContent } from "@/content/privacy";

/*
  The Privacy Policy page sections. The policy list is an accordion, so this file is a client
  component.
*/

const EMAIL_SPLIT = /([^\s@]+@[^\s@]+\.[^\s@]+)/g;
const EMAIL_ONLY = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Any email address in the text becomes a link. */
function linkify(text: string): ReactNode {
  return text.split(EMAIL_SPLIT).map((part, index) =>
    EMAIL_ONLY.test(part) ? (
      <a
        key={index}
        href={`mailto:${part}`}
        className="text-action underline underline-offset-2"
      >
        {part}
      </a>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

/*
  Turns one paragraph box into elements. A line starting with "- " is a bullet and the rest
  are lines of the paragraph, so an address keeps its line breaks.
*/
function Paragraph({ text }: { text: string }) {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  const bullets = lines.filter((line) => line.trimStart().startsWith("- "));
  const prose = lines.filter((line) => !line.trimStart().startsWith("- "));

  return (
    <>
      {prose.length > 0 ? (
        <p className="leading-relaxed">
          {prose.map((line, index) => (
            <span key={index}>
              {index > 0 ? <br /> : null}
              {linkify(line)}
            </span>
          ))}
        </p>
      ) : null}

      {bullets.length > 0 ? (
        <ul className="flex flex-col gap-1.5">
          {bullets.map((line, index) => (
            <li key={index} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-ink" />
              <span>{linkify(line.trimStart().slice(2))}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export function PrivacyHero({ content }: { content: PrivacyPageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      <div className="absolute inset-0 -z-10">
        <Media src={content.image} alt={content.imageAlt} sizes="100vw" />
      </div>

      <div className="container-page pt-32 pb-14 lg:min-h-[36.75rem] lg:pt-[7.5rem] lg:pb-[6rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-action/20 bg-tint px-4 py-2 text-[0.75rem] font-medium tracking-[0.14em] text-action uppercase">
            {/* The same 46 heart as the About Us pill, beating on the spot. */}
            <span
              aria-hidden="true"
              className="relative grid size-5 shrink-0 origin-center animate-heartbeat place-items-center"
            >
              <svg viewBox="0 0 24 24" className="absolute inset-0 size-full fill-action">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="relative -translate-y-px text-[0.375rem] leading-none text-white">
                46
              </span>
            </span>

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

          <Callout className="mt-6 max-w-[34rem]">{content.body}</Callout>

          <DonateButton formId={content.form} size="lg" className="mt-6 hover:shadow-raised">
            {content.cta}
          </DonateButton>
        </div>
      </div>
    </section>
  );
}

export function PolicyAccordion({ content }: { content: PrivacyPageContent["policy"] }) {
  /*
    Which section is open. Nothing to begin with: the first section is a long read, and on a
    phone having it open pushes the rest of the list off the screen.
  */
  const [openIndex, setOpenIndex] = useState(-1);

  /* From sm up there is room for it, so the first section opens as the design has it. */
  useEffect(() => {
    if (window.matchMedia("(min-width: 640px)").matches) setOpenIndex(0);
  }, []);

  return (
    <section id="policy" className="bg-surface py-20 lg:py-28">
      <div className="container-page">
        <ul className="mx-auto flex max-w-[62rem] flex-col gap-3">
          {content.sections.map((section, index) => {
            const isOpen = index === openIndex;

            return (
              <li key={index}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 rounded-card bg-tint px-6 py-5 text-left transition-colors hover:bg-page"
                >
                  {/*
                    Sentence case on a phone: an all-caps heading wraps to two lines and doubles
                    the row, and is slower to read. From sm there is room for the larger size.
                  */}
                  <span
                    className={`policy-title text-[1rem] font-semibold sm:text-[1.125rem] ${
                      isOpen ? "text-action" : "text-ink"
                    }`}
                  >
                    {section.title}
                  </span>

                  <span aria-hidden="true" className="text-[1.25rem] text-action">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/*
                  The panel stays mounted and its row is eased between 0fr and 1fr, so the
                  policy text slides open rather than appearing in one jump. While it is
                  closed it is inert, so nothing inside it can be reached or read.
                */}
                <div
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-2 flex flex-col gap-4 rounded-card bg-band p-6 text-[0.9375rem] text-body">
                      {section.paragraphs.map((paragraph, paragraphIndex) =>
                        paragraph.trim().length > 0 ? (
                          <div key={paragraphIndex}>
                            <Paragraph text={paragraph} />
                          </div>
                        ) : null,
                      )}
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
