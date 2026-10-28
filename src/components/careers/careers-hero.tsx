import Image from "next/image";
import { ButtonLink, Callout } from "@/components/ui";
import type { CareerPageContent } from "@/content/careers";
import { assetUrl } from "@/media";

/*
  The Careers hero. Same white card over a photo as the Volunteer page, with the person-and-plus
  glyph in the pale pill. Its one button jumps down to the openings.
*/
export function CareersHero({ content }: { content: CareerPageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      <div className="absolute inset-0 -z-10">
        <Image
          src={content.image}
          alt={content.imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_50%]"
        />
      </div>

      <div className="container-page pt-32 pb-14 lg:min-h-[37rem] lg:pt-[7.5rem] lg:pb-[6rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-action/20 bg-tint py-1 pr-4 pl-2">
            {/* Just the person-and-plus glyph, bumping. */}
            {/* A plain image, not next/image: this is an SVG, which next/image refuses. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetUrl("/images/careers/badge-join.svg")}
              alt=""
              className="size-5 shrink-0 origin-center animate-heartbeat"
            />

            <span className="flex items-center gap-2">
              <span className="text-[0.75rem] font-medium tracking-[0.14em] text-action uppercase">
                {content.eyebrow}
              </span>

              {/* The three dots, popping one after the next, left to right. */}
              <span
                aria-hidden="true"
                className="size-1 origin-center animate-dot-wave rounded-full bg-action/50"
              />
              <span
                aria-hidden="true"
                className="size-1 origin-center animate-dot-wave rounded-full bg-action/50 [animation-delay:-1350ms]"
              />
              <span
                aria-hidden="true"
                className="size-1 origin-center animate-dot-wave rounded-full bg-action/50 [animation-delay:-1200ms]"
              />
            </span>
          </span>

          <h1 className="mt-5 text-[1.875rem] leading-[1.08] font-semibold sm:text-[2.5rem] lg:text-[2.75rem]">
            {content.headingStart}
            <br />
            <span className="accent">{content.headingAccent}</span> {content.headingEnd}
          </h1>

          <Callout className="mt-6 max-w-[34rem] leading-snug">{content.body}</Callout>

          <ButtonLink href="#jobs" size="lg" className="mt-6 hover:shadow-raised">
            {content.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
