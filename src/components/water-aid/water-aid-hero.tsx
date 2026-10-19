import Image from "next/image";
import { DonateButton } from "@/components/donate/donate-button";
import { Callout } from "@/components/ui";
import type { WaterAidPageContent } from "@/content/water-aid";

/*
  The Water Aid hero. Same arrangement as the healthcare and food-aid heroes — a white card over
  the photo — but the badge is the dark pill, with the droplet and three dots.
*/
export function WaterAidHero({ content }: { content: WaterAidPageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      <div className="absolute inset-0 -z-10">
        <Image
          src={content.image}
          alt={content.imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_53%]"
        />
      </div>

      <div className="container-page pt-32 pb-10 lg:min-h-[46rem] lg:pt-[10.5rem] lg:pb-[6rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          <span className="inline-flex items-center gap-3 overflow-hidden rounded-full border-[1.5px] border-white/12 bg-[linear-gradient(135deg,#0d0d0d,#7f0000)] px-3.5 py-1.5 font-[Georgia,serif] shadow-[0_4px_24px_rgba(180,0,0,0.4)]">
            {/* The droplet in a rounded tile, beating on the spot like the other badges. */}
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-6 shrink-0 origin-center animate-badge-beat"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="rgba(255,255,255,0.15)" />
              <path
                d="M12 5.6c2.4 3 4 5.1 4 7.2a4 4 0 0 1-8 0c0-2.1 1.6-4.2 4-7.2z"
                fill="#ffffff"
              />
            </svg>

            <span className="flex items-center gap-2">
              <span className="text-[0.875rem] tracking-[0.14em] text-white uppercase">
                {content.eyebrow}
              </span>

              {/* The three dots, popping one after the next, left to right. */}
              <span aria-hidden="true" className="flex items-center gap-1">
                <span className="size-1 origin-center animate-dot-wave rounded-full bg-brand" />
                <span className="size-1 origin-center animate-dot-wave rounded-full bg-brand [animation-delay:-1350ms]" />
                <span className="size-1 origin-center animate-dot-wave rounded-full bg-brand [animation-delay:-1200ms]" />
              </span>
            </span>
          </span>

          {/* The accent holds two words, so the narrow card wraps them onto two lines. */}
          <h1 className="mt-5 text-[2rem] leading-none font-semibold sm:text-[2.75rem] lg:text-[3.125rem]">
            {content.headingStart}
            <br />
            <span className="accent">{content.headingAccent}</span>
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
