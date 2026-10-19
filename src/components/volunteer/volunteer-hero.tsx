import Image from "next/image";
import { ButtonLink, Callout } from "@/components/ui";
import type { VolunteerPageContent } from "@/content/volunteer";

/*
  The Volunteer hero. Same white card over a photo as the appeal pages, but with two buttons side
  by side and a pale pill in place of the dark one.
*/
export function VolunteerHero({ content }: { content: VolunteerPageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      <div className="absolute inset-0 -z-10">
        <Image
          src={content.image}
          alt={content.imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_35%]"
        />
      </div>

      <div className="container-page pt-32 pb-24 lg:min-h-[37rem] lg:pt-[7.5rem] lg:pb-[9rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-action/20 bg-tint py-1 pr-4 pl-2">
            {/* Just the heart with its tick, bumping. */}
            {/* A plain image, not next/image: this is an SVG, which next/image refuses. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/volunteer/heart.svg"
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

          <h1 className="mt-5 text-[2rem] leading-[1.08] font-semibold sm:text-[2.75rem] lg:text-[3.125rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>
            <br />
            {content.headingEnd}
          </h1>

          <Callout className="mt-6 max-w-[34rem] leading-snug">{content.body}</Callout>

          {/*
            Two ways in: the white button opens the Bloomerang sign-up in a new tab; the red one
            scrolls down to the "Volunteer with us" (Real Experiences) section on this page.
          */}
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink
              variant="secondary"
              size="lg"
              href="https://volunteer.bloomerang.co/volunteer/#/join-party?k=7tzvzeb38wawsx"
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.primaryCta}
            </ButtonLink>
            <ButtonLink variant="primary" size="lg" href="#volunteer-with-us">
              {content.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
