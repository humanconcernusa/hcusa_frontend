"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/youth/youth-sections";
import type { YouthPageContent } from "@/content/youth";

/*
  The FAQ. The first answer starts open; the others ease open on click. The panel stays mounted so
  it can animate, and carries `inert` while closed so its text leaves the tab order.
*/
export function YouthFaq({ content }: { content: YouthPageContent["faq"] }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page max-w-[46rem]">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2rem] leading-[1.1] font-semibold lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
        </h2>

        <ul className="mt-12 space-y-4">
          {content.items.map((item, index) => {
            const isOpen = open === index;

            return (
              <li key={item.question} className="rounded-xl bg-page">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface text-body">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5" fill="none">
                      <path
                        d={isOpen ? "M5 12h14" : "M12 5v14M5 12h14"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>

                  <span className="text-[1rem] font-medium text-ink">{item.question}</span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <div className="space-y-3 px-5 pb-5 pl-16">
                      {item.answer.map((paragraph) => (
                        <p key={paragraph} className="text-[0.9375rem] leading-relaxed text-body">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 rounded-full border border-line px-6 py-4 text-center text-[0.9375rem] text-body">
          {content.contactLead}{" "}
          <a href={`mailto:${content.contactEmail}`} className="text-action hover:underline">
            {content.contactEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
