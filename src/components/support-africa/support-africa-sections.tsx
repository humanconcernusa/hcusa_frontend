import { Eyebrow, Media } from "@/components/ui";
import { DonateButton } from "@/components/donate/donate-button";
import type { SupportAfricaPageContent } from "@/content/support-africa";

/*
  The Support Africa sections. The copy comes from src/content/support-africa.ts and every donate
  button opens the "africa" popup.
*/

/* The four icons for the why cards, in the order the live page has them, drawn as red
   line drawings to match. */
function WhyIcon({ index }: { index: number }) {
  const stroke = "size-9 fill-none stroke-action stroke-[1.6]";

  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
        <path d="M13 2 4.5 13H10l-1 9 8.5-11H12z" strokeLinejoin="round" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
        <path d="M12 3.5 2.5 20h19z" strokeLinejoin="round" />
        <path d="M12 10v4" strokeLinecap="round" />
        <circle cx="12" cy="17" r="0.6" className="fill-current" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
        <rect x="5" y="10.5" width="14" height="10" rx="2" />
        <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
      <path
        d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8-4.2-4.1 5.9-.9z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhyNeeded({ content }: { content: SupportAfricaPageContent["why"] }) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
          <br />
          {content.headingEnd}
        </h2>

        <p className="mt-4 text-center text-[0.9375rem] text-body">{content.subtitle}</p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.cards.map((card, index) => (
            <li
              key={card.title}
              className="flex flex-col items-center rounded-card border border-line bg-surface p-6 text-center shadow-card"
            >
              <WhyIcon index={index} />
              <p className="mt-4 text-[1rem] font-semibold text-ink">{card.title}</p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-body">{card.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 aspect-[16/7] w-full overflow-hidden rounded-card">
          <Media src={content.image} alt={content.imageAlt} sizes="(min-width: 1024px) 1280px, 100vw" />
        </div>

        <div className="mt-10 flex justify-center">
          <DonateButton formId={content.form} variant="secondary" size="lg">
            {content.cta}
          </DonateButton>
        </div>
      </div>
    </section>
  );
}

export function ReliefGrid({ content }: { content: SupportAfricaPageContent["relief"] }) {
  return (
    <section className="bg-page py-20 lg:py-28">
      <div className="container-page">
        <h2 className="text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
          <br className="hidden lg:block" />{" "}
          <span className="accent">{content.headingAccentTwo}</span> {content.headingEnd}
        </h2>

        <div className="mt-12 grid gap-5 rounded-card bg-surface p-5 shadow-raised lg:grid-cols-[1.1fr_1fr] lg:p-6">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {content.items.map((item) => (
              <li
                key={item.line1}
                className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-line bg-surface px-3 py-6 text-center"
              >
                {/*
                  A plain image, not next/image: these are SVGs, which next/image refuses
                  by default.
                */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.icon} alt="" className="size-10" />
                <p className="text-[0.875rem] leading-snug text-ink">
                  {item.line1}
                  <br />
                  {item.line2}
                </p>
              </li>
            ))}
          </ul>

          <div className="min-h-[14rem] overflow-hidden rounded-2xl">
            <Media
              src={content.image}
              alt={content.imageAlt}
              sizes="(min-width: 1024px) 620px, 90vw"
            />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <DonateButton formId={content.form} variant="secondary" size="lg">
            {content.cta}
          </DonateButton>
        </div>
      </div>
    </section>
  );
}

export function RespondSteps({ content }: { content: SupportAfricaPageContent["responds"] }) {
  return (
    <section className="bg-page pb-20 lg:pb-28">
      <div className="container-page">
        <div className="rounded-card bg-surface px-6 py-14 shadow-card lg:px-10 lg:py-16">
          <Eyebrow>{content.eyebrow}</Eyebrow>

          <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
            {content.headingStart}
            <br className="hidden lg:block" />{" "}
            <span className="accent">{content.headingAccent}</span> {content.headingEnd}
          </h2>

          <p className="mt-4 text-center text-[0.9375rem] text-body">{content.subtitle}</p>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {content.steps.map((step) => (
              <li
                key={step.number}
                className="flex flex-col rounded-2xl border border-action/20 p-2"
              >
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl">
                  <Media src={step.image} alt={step.title} sizes="(min-width: 768px) 400px, 90vw" />
                </div>

                {/* From md the cards are a third of the row, so the number block moves above the
                    words rather than beside them; side by side it left one word per line. */}
                <div className="flex flex-1 items-stretch gap-3 p-3 md:flex-col md:items-start">
                  <span className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-ink px-3 py-2 leading-none text-white">
                    <span className="text-[0.5625rem] font-semibold tracking-[0.18em] uppercase">
                      Step
                    </span>
                    <span className="mt-1 text-[1.25rem] font-semibold">{step.number}</span>
                  </span>

                  {/* The upright rule only makes sense while the block sits beside the words. */}
                  <span aria-hidden="true" className="w-0.5 shrink-0 rounded-full bg-action md:hidden" />

                  <div className="min-w-0 flex-1">
                    <p className="text-[1rem] font-semibold text-ink">{step.title}</p>

                    <p className="mt-1 flex items-center gap-1.5 text-[0.875rem] text-body">
                      <span aria-hidden="true" className="tracking-[0.2em] text-action">
                        •••
                      </span>
                      {step.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function SupportGiving({ content }: { content: SupportAfricaPageContent["giving"] }) {
  return (
    <section id="giving" className="bg-page py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <ul className="giving-grid mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.levels.map((level) => (
            <li
              key={level.amount}
              className="giving-tile flex flex-col rounded-card bg-surface p-6 shadow-card"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-[1.5rem] font-semibold text-action">${level.amount}</p>

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="mt-1 size-5 shrink-0 fill-none stroke-action stroke-[1.6]"
                >
                  <path
                    d="M12 20.1l-1.1-1C6.6 15.2 4.2 13 4.2 10a4.3 4.3 0 0 1 4.3-4.3c1.3 0 2.5.6 3.5 1.6 1-1 2.2-1.6 3.5-1.6A4.3 4.3 0 0 1 19.8 10c0 3-2.4 5.2-6.7 9.1z"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="mt-3 flex-1 text-[0.9375rem] leading-snug text-body">{level.text}</p>

              <DonateButton formId={content.form} variant="dark" className="mt-4 w-full">
                {content.cta}
              </DonateButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
