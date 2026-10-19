import Image from "next/image";
import { DonateButton } from "@/components/donate/donate-button";
import { Callout } from "@/components/ui";
import type { HealthcarePageContent } from "@/content/healthcare";

/*
  The same shape as the home hero: a white card sitting over the photo, not text laid
  straight onto it. The live page uses exactly this arrangement.
*/
export function HealthcareHero({ content }: { content: HealthcarePageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      {/*
        The frame fills the section, exactly as the layout wants, and the picture is moved
        down INSIDE that frame with object-position. Moving the frame instead left a strip of
        the section showing at the top - that was the gap. The second number is the vertical
        position: lower it to bring the picture further down. 50% is the default centre.
      */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={content.image}
          alt={content.imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_20%]"
        />
      </div>

      <div className="container-page pt-32 pb-14 lg:min-h-[36.75rem] lg:pt-[7.5rem] lg:pb-[6rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          {/*
            The badge: a plus in a dark tile, the words, then three dots. The tile beats on
            the spot, as the pill icons on the other pages do.
          */}
          <span className="inline-flex items-center gap-3 overflow-hidden rounded-full border-[1.5px] border-white/12 bg-[linear-gradient(135deg,#0d0d0d,#7f0000)] px-3.5 py-1.5 font-[Georgia,serif] shadow-[0_4px_24px_rgba(180,0,0,0.4)]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-6 shrink-0 origin-center animate-badge-beat"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="rgba(255,255,255,0.15)" />
              <rect x="9.5" y="5.5" width="5" height="13" rx="2" fill="#ffffff" />
              <rect x="5.5" y="9.5" width="13" height="5" rx="2" fill="#ffffff" />
            </svg>

            <span className="flex items-center gap-2">
              <span className="text-[0.875rem] text-white">{content.eyebrow}</span>
              <span
                aria-hidden="true"
                className="size-1 origin-center animate-dot-wave rounded-full bg-brand"
              />
              <span
                aria-hidden="true"
                className="size-1 origin-center animate-dot-wave rounded-full bg-brand [animation-delay:-1350ms]"
              />
              <span
                aria-hidden="true"
                className="size-1 origin-center animate-dot-wave rounded-full bg-brand [animation-delay:-1200ms]"
              />
            </span>
          </span>

          <h1 className="mt-5 text-[1.875rem] leading-none font-semibold tracking-wide sm:text-[2.5rem] lg:text-[2.75rem]">
            {content.headingStart}
            <br />
            <span className="accent">{content.headingAccent}</span>
          </h1>

          <Callout className="mt-6 max-w-[34rem] leading-snug">{content.body}</Callout>

          {/* Opens the popup chosen in the admin, defaulting to the first card's. */}
          <DonateButton formId={content.form} size="md" className="mt-6 hover:shadow-raised">
            {content.cta}
          </DonateButton>
        </div>
      </div>
    </section>
  );
}
