import { Badge } from "@/components/ui";
import type { HomeContent } from "@/content/home";

/* Stat icons are fixed by position. The admin edits the values and labels. */
const STAT_ICONS = ["person", "book", "doc"] as const;
type StatIconName = (typeof STAT_ICONS)[number];

function StatIcon({ name }: { name: StatIconName }) {
  const stroke = "size-4 stroke-action fill-none stroke-[1.7]";

  if (name === "person") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5.5 19.5c0-3.3 2.9-5.6 6.5-5.6s6.5 2.3 6.5 5.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "book") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
        <path d="M4 5.5h5.5A2.5 2.5 0 0112 8v11a2 2 0 00-2-2H4z" strokeLinejoin="round" />
        <path d="M20 5.5h-5.5A2.5 2.5 0 0012 8v11a2 2 0 012-2h6z" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={stroke}>
      <rect x="4.5" y="4" width="15" height="16" rx="2" />
      <path d="M8 9h8M8 13h8M8 17h5" strokeLinecap="round" />
    </svg>
  );
}

export function Impact({ content }: { content: HomeContent["impact"] }) {
  return (
    <section id="impact" className="bg-page pt-4 pb-14 lg:py-20">
      <div className="container-page">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-16">
          {/* Centred on phones and tablets, as on the reference site; left-aligned beside the card on desktop. */}
          <div className="text-center lg:text-left">
            <h2 className="text-[2.75rem] leading-[1.06] font-semibold lg:text-[4rem]">
              {content.headingStart}{" "}
              <br className="hidden lg:block" />
              <span className="accent">{content.headingAccent}</span>
              <br />
              {content.headingEnd}
            </h2>
            <p className="mx-auto mt-4 max-w-[40ch] text-[0.9375rem] text-ink lg:mx-0 lg:mt-6 lg:text-body">
              {content.intro}
            </p>
          </div>

          <div className="rounded-card bg-surface p-4 pt-8 shadow-card sm:p-7 lg:p-10">
            {/* The label sits above the figure on phones, and beside it from lg up. */}
            <div className="flex flex-col-reverse items-start gap-3 px-3 sm:px-0 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-6">
              <p className="text-[4.5rem] leading-none font-semibold text-action lg:text-[5.25rem]">
                {content.headline}
              </p>
              <Badge
                icon={
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 shrink-0">
                    <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="8" cy="8" r="2.5" fill="currentColor" />
                  </svg>
                }
              >
                {content.headlineLabel}
              </Badge>
            </div>

            <p className="mt-4 max-w-[56ch] px-3 text-[0.9375rem] text-body sm:px-0">{content.headlineNote}</p>

            {/*
              Two columns on phones leave the third stat alone on a row of its own, so from 390
              up it takes the full width instead. From sm, where there are three columns, it goes
              back to sharing the row.
            */}
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
              {content.stats.map((stat, index) => (
                <li
                  key={stat.label}
                  className={`rounded-2xl border border-line bg-surface p-4 shadow-card sm:p-6 ${
                    index === 2 ? "min-[390px]:col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-tint">
                    <StatIcon name={STAT_ICONS[index] ?? "person"} />
                  </span>
                  <p className="mt-4 text-[0.75rem] font-medium tracking-[0.06em] text-body uppercase sm:mt-5">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-[2rem] leading-none font-semibold text-action sm:text-[2.5rem]">
                    {stat.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
