import { DonateButton } from "@/components/donate/donate-button";
import type { FoodAidPageContent } from "@/content/food-aid";
import { assetUrl } from "@/media";

/*
  The Food Aid "Why" band. Same arrangement as the healthcare page's, but the four card
  icons are the saved SVGs rather than drawings.
*/
/* One icon per card, in the order the cards run. */
const WHY_ICONS = [
  /* Medical Treatments — the medicine bag. */
  "/images/food-aid/why-card-1.svg",
  /* Child Healthcare — the figures. */
  "/images/food-aid/why-card-2.svg",
  /* Medication — the capsule. */
  "/images/food-aid/why-card-3.svg",
  /* Medical Aid — the medical kit. */
  "/images/food-aid/why-card-4.svg",
];

export function WhyFoodAid({ content }: { content: FoodAidPageContent["why"] }) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
            {content.eyebrow}
          </p>

          <h2 className="mt-4 text-[2.25rem] leading-[1.1] font-semibold lg:text-[3rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>
            <br />
            {content.headingEnd}
          </h2>

          {/* The short line above the paragraph is optional, so an empty one leaves no gap. */}
          {content.lead.length > 0 ? (
            <p className="mt-4 text-[0.9375rem] text-body">{content.lead}</p>
          ) : null}

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
              <img src={assetUrl(WHY_ICONS[index % WHY_ICONS.length])} alt="" className="size-12" />
              <p className="text-[1rem] font-medium text-ink">{card.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
