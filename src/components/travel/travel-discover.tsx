import Image from "next/image";
import type { TravelPageContent } from "@/content/travel";
import { assetUrl } from "@/media";

/*
  The dark band: the pill with the plane, the heading with its red phrase, the two paragraphs, and
  the map.

  The map file carries a white background rather than a transparent one, so it sits on a white panel
  here instead of floating on the dark ground the reference shows. A transparent copy would let me
  drop the panel.
*/
export function TravelDiscover({ content }: { content: TravelPageContent["discover"] }) {
  return (
    <section className="bg-ink py-20 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full bg-surface py-1 pr-4 pl-1">
            <span className="relative grid size-7 shrink-0 place-items-center rounded-full bg-action">
              {/* The ring that pulses out of the round logo, like the step dots. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-logo-pulse rounded-full border-2 border-action"
              />
              {/* A plain image, not next/image: this is an SVG, which next/image refuses. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={assetUrl("/images/travel/plane.svg")} alt="" className="relative size-[15px]" />
            </span>

            <span className="text-[0.75rem] font-medium tracking-[0.14em] text-ink uppercase">
              {content.eyebrow}
            </span>
          </span>

          <h2 className="mt-5 text-[2rem] leading-[1.1] font-semibold text-white lg:text-[3rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
            {content.headingEnd}
          </h2>

          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-[0.9375rem] leading-relaxed text-white/75">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="rounded-card bg-surface p-4">
          <div className="relative aspect-[4/3]">
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
