"use client";

import { Button } from "@/components/ui";
import type { TravelPageContent } from "@/content/travel";

/*
  Register Your Interest.

  The dark registration panel from the reference. Every field types and the required marks show, but
  Submit carries no handler — nothing is sent, as there is nowhere to send it yet.
*/
export function TravelForm({ content }: { content: TravelPageContent["form"] }) {
  const fieldClass =
    "mt-2 min-h-11 w-full rounded-sm border-0 bg-white px-3 text-[0.9375rem] text-ink outline-none placeholder:text-body/50 focus:ring-2 focus:ring-action";

  return (
    <section id="register-your-interest" className="scroll-mt-28 bg-surface py-20 lg:py-28">
      <div className="container-page">
        <p className="text-center text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
          {content.eyebrow}
        </p>

        <h2 className="mt-4 text-center text-[2rem] leading-[1.05] font-semibold lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
          {content.headingEnd}
        </h2>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto mt-12 max-w-[34rem] overflow-hidden rounded-lg"
        >
          {/* The panel's head sits darker than the body, as the reference shows. */}
          <div className="bg-[#0d0d0d] px-6 py-7 text-center">
            <p className="text-[1.375rem] font-semibold text-white">{content.panelTitle}</p>
            <p className="mt-1 text-[0.875rem] text-white/80">{content.panelSubtitle}</p>
          </div>

          <div className="bg-[#2b2b2b] px-6 py-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {content.fields.map((field) => (
                <label key={field.name} className="block">
                  <span className="text-[0.875rem] text-white">
                    {field.label}
                    {field.required ? <span className="text-action"> *</span> : null}
                  </span>

                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    className={fieldClass}
                  />

                  {field.hint ? (
                    <span className="mt-1 block text-[0.75rem] text-white/60">{field.hint}</span>
                  ) : null}
                </label>
              ))}
            </div>

            <label className="mt-5 block">
              <span className="text-[0.875rem] text-white">
                {content.healthLabel}
                <span className="text-action"> *</span>
              </span>

              <textarea name="health" rows={6} className={`${fieldClass} py-2`} />

              <span className="mt-1 block text-[0.75rem] text-white/60">{content.healthHint}</span>
            </label>

            {/* No handler on purpose: nothing is sent anywhere yet. */}
            <div className="mt-7 flex justify-center border-t border-white/10 pt-7">
              <Button type="button" className="min-w-[10rem]">
                {content.cta}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
