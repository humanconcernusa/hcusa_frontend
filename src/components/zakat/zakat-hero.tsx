import Image from "next/image";
import { DonateButton } from "@/components/donate/donate-button";
import { Callout } from "@/components/ui";
import type { ZakatPageContent } from "@/content/zakat";

/*
  The Zakat hero. Same arrangement as the other appeal heroes — a white card over the photo —
  with the crescent glyph in the dark pill.
*/
export function ZakatHero({ content }: { content: ZakatPageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      <div className="absolute inset-0 -z-10">
        <Image
          src={content.image}
          alt={content.imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_20%]"
        />
      </div>

      <div className="container-page pt-32 pb-24 lg:min-h-[36.75rem] lg:pt-[7.5rem] lg:pb-[9rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          <span className="inline-flex items-center gap-2.5 overflow-hidden rounded-full border-[1.5px] border-white/12 bg-[linear-gradient(135deg,#0d0d0d,#7f0000)] px-4 py-1.5 font-medium shadow-[0_4px_24px_rgba(180,0,0,0.4)]">
            {/* A plain image, not next/image: this is an SVG, which next/image refuses. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/zakat/badge-zakat.svg"
              alt=""
              className="size-[26px] shrink-0 origin-center animate-badge-beat"
            />

            <span className="flex items-center gap-2">
              <span className="text-[0.9375rem] tracking-[0.14em] text-white">
                {content.eyebrow}
              </span>

              {/* The three dots, popping one after the next, left to right. */}
              <span
                aria-hidden="true"
                className="size-1 origin-center animate-dot-wave rounded-full bg-white/70"
              />
              <span
                aria-hidden="true"
                className="size-1 origin-center animate-dot-wave rounded-full bg-white/70 [animation-delay:-1350ms]"
              />
              <span
                aria-hidden="true"
                className="size-1 origin-center animate-dot-wave rounded-full bg-white/70 [animation-delay:-1200ms]"
              />
            </span>
          </span>

          <h1 className="mt-5 text-[2rem] leading-none font-semibold sm:text-[2.75rem] lg:text-[3.125rem]">
            {content.headingStart}
            <br />
            <span className="accent">{content.headingAccent}</span>
          </h1>

          <Callout className="mt-6 max-w-[34rem] leading-snug">{content.body}</Callout>

          <DonateButton formId={content.form} size="lg" className="mt-6 hover:shadow-raised">
            {content.cta}
          </DonateButton>
        </div>
      </div>
    </section>
  );
}
