import Image from "next/image";
import { DonateButton } from "@/components/donate/donate-button";
import { Callout } from "@/components/ui";
import type { FoodAidPageContent } from "@/content/food-aid";

/*
  The Food Aid hero. Same arrangement as the healthcare hero — a white card sitting over the
  photo — with a bowl in place of the healthcare cross.
*/
export function FoodAidHero({ content }: { content: FoodAidPageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      <div className="absolute inset-0 -z-10">
        <Image
          src={content.image}
          alt={content.imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_55%]"
        />
      </div>

      <div className="container-page flex items-center pt-32 pb-32 lg:min-h-[36.75rem] lg:pt-[9.5rem] lg:pb-[9.5rem]">
        <div className="w-full max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          {/*
            The badge: a bowl in a dark tile, the words, then three dots. It matches the
            healthcare page's badge, which the rest of this page follows.
          */}
          <span className="inline-flex items-center gap-3 overflow-hidden rounded-full border-[1.5px] border-white/12 bg-[linear-gradient(135deg,#0d0d0d,#7f0000)] px-3.5 py-1.5 font-medium shadow-[0_4px_24px_rgba(180,0,0,0.4)]">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-6 shrink-0 origin-center animate-badge-beat"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="rgba(255,255,255,0.15)" />
              <path d="M5 11.5h14c0 4.1-3.1 7.4-7 7.4s-7-3.3-7-7.4z" fill="#ffffff" />
              <path
                d="M9.6 5.6c0 1.3 1.1 1.9 1.1 3.2M13.3 5.6c0 1.3 1.1 1.9 1.1 3.2"
                stroke="#ffffff"
                strokeWidth="1.4"
                strokeLinecap="round"
                fill="none"
              />
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

          <h1 className="mt-5 text-[1.875rem] leading-none font-semibold sm:text-[2.5rem] lg:text-[2.75rem]">
            {content.headingStart}
            <br />
            <span className="accent">{content.headingAccent}</span>
          </h1>

          <Callout className="mt-6 max-w-[34rem] leading-snug">{content.body}</Callout>

          <DonateButton formId={content.form} size="md" className="mt-6 hover:shadow-raised">
            {content.cta}
          </DonateButton>
        </div>
      </div>
    </section>
  );
}
