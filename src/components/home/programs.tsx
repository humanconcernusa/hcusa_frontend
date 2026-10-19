import Link from "next/link";
import { DonateButton } from "@/components/donate/donate-button";
import { Eyebrow, Media } from "@/components/ui";
import type { HomeContent } from "@/content/home";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function Programs({ content }: { content: HomeContent["programs"] }) {
  return (
    <section id="programs" className="bg-page pt-14 pb-20 lg:pt-20 lg:pb-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
        </h2>
        <p className="mt-3 text-center text-[0.9375rem] text-body">{content.subtitle}</p>

        {/* Three per row from 820; see the .programs-row rule in styles/responsive.css. */}
        <ul className="container-cards programs-row mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card, index) => {
            /* A goal of zero would divide by zero, so the bar stays empty instead. */
            const percent =
              card.goal > 0 ? Math.min(100, Math.round((card.raised / card.goal) * 100)) : 0;

            return (
              <li
                key={index}
                className="flex flex-col overflow-hidden rounded-card bg-surface shadow-card"
              >
                <div className="aspect-[16/9] w-full">
                  <Media
                    src={card.image}
                    alt={card.imageAlt}
                    sizes="(min-width: 1024px) 360px, (min-width: 820px) 250px, (min-width: 640px) 45vw, 90vw"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.9375rem] text-body">
                    <span className="text-[1.0625rem] font-semibold text-action">
                      {money.format(card.raised)}
                    </span>{" "}
                    of {money.format(card.goal)} raised
                  </p>

                  <div
                    role="progressbar"
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${card.title} funding progress`}
                    className="mt-3 h-3.5 w-full overflow-hidden rounded-full bg-divider"
                  >
                    <div className="h-full rounded-full bg-progress" style={{ width: `${percent}%` }} />
                  </div>

                  <h3 className="mt-7 text-center text-[1.25rem] leading-[1.25] font-semibold font-accent">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-center text-[0.9375rem] text-body">{card.text}</p>

                  <Link
                    href={card.href}
                    className="mt-1 block py-3 text-center text-[0.9375rem] text-action underline underline-offset-4 transition-colors hover:text-action-hover"
                  >
                    Learn More
                  </Link>

                  {/*
                    mt-auto pins the button to the bottom of the card, so the buttons line up
                    across the row whatever the title and the text above them come to.
                  */}
                  <div className="mt-auto flex justify-center pt-6">
                    <DonateButton formId={card.form}>{card.cta}</DonateButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
