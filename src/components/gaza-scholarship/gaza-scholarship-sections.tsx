import { Eyebrow, Media } from "@/components/ui";
import { CountUp } from "@/components/count-up";
import { DonateButton } from "@/components/donate/donate-button";
import type { GazaPageContent } from "@/content/gaza-scholarship";

/*
  The Gaza Scholarship page sections. The copy comes from src/content/gaza-scholarship.ts; every
  donate button opens the "gaza" popup.
*/

export function WhyScholarship({ content }: { content: GazaPageContent["why"] }) {
  return (
    <section className="bg-page py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <p className="mx-auto mt-4 max-w-[46rem] text-center text-[0.9375rem] leading-relaxed text-body">
          {content.body}
        </p>

        <div className="mt-12 aspect-[16/6] w-full overflow-hidden rounded-card">
          <Media
            src={content.image}
            alt={content.imageAlt}
            sizes="(min-width: 1024px) 1280px, 100vw"
          />
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

/* The six icons for the relief grid, in order. */
function ReliefIcon({ index }: { index: number }) {
  const stroke = "size-6 fill-none stroke-action stroke-[1.6]";

  if (index === 0) {
    // A bowl of food.
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
        <path d="M4 11h16a8 8 0 0 1-16 0z" strokeLinejoin="round" />
        <path d="M9 8c0-1.5 1.3-1.5 1.3-3M13 8c0-1.5 1.3-1.5 1.3-3" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 1) {
    // A water drop.
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
        <path
          d="M12 3.5c3 3.6 5.5 6.6 5.5 9.6a5.5 5.5 0 0 1-11 0c0-3 2.5-6 5.5-9.6z"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (index === 2) {
    // A medical kit.
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
        <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
        <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" strokeLinecap="round" />
        <path d="M12 11v5M9.5 13.5h5" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 3) {
    // A shelter.
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
        <path d="M4 11 12 4l8 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10v9h12v-9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 19v-5h4v5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (index === 4) {
    // Child & family support: two people.
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0" strokeLinecap="round" />
        <circle cx="16.5" cy="9" r="2.5" />
        <path d="M14 19a4.5 4.5 0 0 1 6.5-4" strokeLinecap="round" />
      </svg>
    );
  }

  // Hygiene & emergency kits: a bottle and pouch.
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
      <path d="M9 8.5h4v11H9z" strokeLinejoin="round" />
      <path d="M10 8.5V6h2v2.5" strokeLinecap="round" />
      <path d="M15.5 12h4l-.8 7.5h-2.4z" strokeLinejoin="round" />
      <path d="M16.5 12V10h2v2" strokeLinecap="round" />
    </svg>
  );
}

export function DonationHelps({ content }: { content: GazaPageContent["helps"] }) {
  return (
    <section className="bg-page py-20 lg:py-28">
      <div className="container-page">
        <h2 className="text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <div className="mt-12 grid gap-5 rounded-card bg-surface p-5 shadow-raised lg:grid-cols-[1.1fr_1fr] lg:p-6">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {content.items.map((item, index) => (
              <li
                key={item.line1}
                className="flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-line bg-surface px-3 py-6 text-center"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-tint">
                  <ReliefIcon index={index} />
                </span>
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

export function RespondSteps({ content }: { content: GazaPageContent["responds"] }) {
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
                <div className="flex flex-1 items-start gap-3 p-3 md:flex-col">
                  <span className="flex shrink-0 flex-col items-center rounded-lg bg-ink px-3 py-2 leading-none text-white">
                    <span className="text-[0.5625rem] font-semibold tracking-[0.18em] uppercase">
                      Step
                    </span>
                    <span className="mt-1 text-[1.25rem] font-semibold">{step.number}</span>
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-[1rem] font-semibold text-ink">{step.title}</p>

                    <span
                      className="mt-2 block h-0.5 w-full rounded-full bg-action"
                      aria-hidden="true"
                    />

                    <p className="mt-2 flex items-center gap-1.5 text-[0.875rem] text-body">
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

export function StatsBand({ content }: { content: GazaPageContent["stats"] }) {
  return (
    <section className="bg-action py-14">
      <div className="container-page flex flex-wrap justify-center gap-5">
        {content.map((figure) => (
          <div
            key={figure.label}
            className="flex w-full flex-col items-center rounded-card bg-surface px-6 py-6 text-center shadow-card sm:w-[13.5rem]"
          >
            {/* Climbs to the figure the first time the band is scrolled to. */}
            <CountUp
              value={figure.value}
              className="text-[2rem] leading-none font-semibold text-action"
            />
            <p className="mt-2 text-[0.8125rem] leading-snug text-body">{figure.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Giving({ content }: { content: GazaPageContent["giving"] }) {
  return (
    <section id="giving" className="bg-page py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
          <br className="hidden lg:block" /> {content.headingEnd}
        </h2>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.levels.map((level) => (
            <li
              key={level.amount}
              className="flex flex-col rounded-card bg-surface p-6 shadow-card"
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

              <DonateButton formId={content.form} variant="dark" className="mt-6 w-full">
                {content.cta}
              </DonateButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
