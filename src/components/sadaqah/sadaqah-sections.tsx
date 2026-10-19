import { DonateButton } from "@/components/donate/donate-button";
import type { SadaqahPageContent } from "@/content/sadaqah";

/*
  The one band this page does not share: What is Sadaqah?, with the four cards beside it.
*/

/* The four card icons, in the order the cards run. */
const WHY_ICONS = [
  "/images/sadaqah/why-voluntary.svg",
  "/images/sadaqah/why-anytime.svg",
  "/images/sadaqah/why-need.svg",
  "/images/sadaqah/why-blessings.svg",
];

export function WhySadaqah({ content }: { content: SadaqahPageContent["why"] }) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
            {content.eyebrow}
          </p>

          {/* The heading is one line here, so the red word sits inside it. */}
          <h2 className="mt-4 text-[2.25rem] leading-[1.1] font-semibold lg:text-[3rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>
            {content.headingEnd}
          </h2>

          <p className="mt-4 text-[0.9375rem] text-body">{content.lead}</p>

          <p className="mt-4 text-[1rem] leading-relaxed text-body">{content.body}</p>

          <DonateButton formId={content.form} variant="dark" size="lg" className="mt-8">
            {content.cta}
          </DonateButton>
        </div>

        <ul className="grid grid-cols-2 gap-5">
          {content.cards.map((card, index) => (
            <li
              key={index}
              className="flex flex-col items-center gap-4 rounded-card bg-surface px-4 py-10 text-center shadow-card"
            >
              {/* A plain image, not next/image: these are SVGs, which next/image refuses
                  by default. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={WHY_ICONS[index % WHY_ICONS.length]} alt="" className="size-12" />
              <p className="text-[1rem] font-medium text-ink">{card.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
