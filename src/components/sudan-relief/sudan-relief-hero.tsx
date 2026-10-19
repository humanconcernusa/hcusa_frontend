import Image from "next/image";
import { DonateButton } from "@/components/donate/donate-button";
import type { SudanPageContent } from "@/content/sudan-relief";

/*
  The Sudan hero. Same arrangement as the other appeals — a white card sitting over the
  photo — with the red italic word opening the title. The wording comes from
  src/content/sudan-relief.ts.
*/
export function SudanHero({ content }: { content: SudanPageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      <div className="absolute inset-0 -z-10">
        <Image
          src={content.image}
          alt={content.imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover object-[65%_45%]"
        />
      </div>

      <div className="container-page pt-32 pb-14 lg:min-h-[36.75rem] lg:pt-[7.5rem] lg:pb-[6rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          {/*
            The alert pill: a bell in a dark shell that glows, with rings that ripple out of it.
            The pill clips them, so they read as arcs inside its shape. The same one the other
            appeals show.
          */}
          <span className="inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#3a0000] bg-[#100000] py-[3px] pr-8 pl-1.5 text-[1rem] font-medium tracking-wide text-white">
            <span className="relative grid size-[38px] shrink-0 animate-icon-glow place-items-center rounded-full border border-[#3a0000] bg-[#100000]">
              <span
                aria-hidden="true"
                className="absolute -inset-px animate-ripple rounded-full border border-[#cc1111]"
              />
              <span
                aria-hidden="true"
                className="absolute -inset-px animate-ripple rounded-full border border-[#cc1111] [animation-delay:0.9s]"
              />
              <span
                aria-hidden="true"
                className="absolute -inset-px animate-ripple rounded-full border border-[#cc1111] [animation-delay:1.8s]"
              />

              <svg viewBox="0 0 24 24" aria-hidden="true" className="relative size-[20px]">
                <line
                  x1="12"
                  y1="2"
                  x2="12"
                  y2="4.4"
                  stroke="#e03030"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="4.9"
                  y1="4.4"
                  x2="6.5"
                  y2="6"
                  stroke="#e03030"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="19.1"
                  y1="4.4"
                  x2="17.5"
                  y2="6"
                  stroke="#e03030"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path d="M7.5 15.5 C7.5 11 9.6 7 12 7 C14.4 7 16.5 11 16.5 15.5 Z" fill="#e03030" />
                <rect x="6.5" y="15.5" width="11" height="2.5" rx="1.25" fill="#b01010" />
                <rect x="9.5" y="18.5" width="5" height="1.6" rx="0.8" fill="#850c0c" />
              </svg>
            </span>

            {content.badge}
          </span>

          <h1 className="mt-5 text-[2rem] leading-none font-semibold sm:text-[2.75rem] lg:text-[3.125rem]">
            <span className="accent">{content.headingAccent}</span> {content.headingEnd}
          </h1>

          <div className="mt-6 max-w-[34rem] border-l-4 border-action bg-tint px-4 py-3 text-[1rem] text-ink">
            {content.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? undefined : "mt-3"}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Opens the popup this page's hero button is set to. */}
          <DonateButton formId={content.form} size="lg" className="mt-6">
            {content.cta}
          </DonateButton>
        </div>
      </div>
    </section>
  );
}
