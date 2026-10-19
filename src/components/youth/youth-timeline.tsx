import { Eyebrow } from "@/components/youth/youth-sections";
import type { YouthPageContent } from "@/content/youth";

/*
  The timeline: a centre rule, a dot per entry, and the entries alternating left and right. On
  narrow screens the rule moves to the left and every entry sits beside it.
*/
export function YouthTimeline({ content }: { content: YouthPageContent["timeline"] }) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>

        <h2 className="mt-4 text-center text-[2rem] leading-[1.1] font-semibold lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <ol className="relative mx-auto mt-14 max-w-[44rem]">
          <span
            aria-hidden="true"
            className="absolute inset-y-2 left-2.5 w-px bg-line sm:left-1/2 sm:-translate-x-1/2"
          />

          {content.entries.map((entry, index) => (
            <li key={entry.title} className="relative grid pb-10 last:pb-0 sm:grid-cols-2">
              <div
                className={
                  index % 2 === 0
                    ? "pl-10 sm:pr-12 sm:pl-0 sm:text-right"
                    : "pl-10 sm:col-start-2 sm:pl-12"
                }
              >
                <span className="inline-block rounded-full bg-tint px-3 py-1 text-[0.6875rem] font-semibold text-action">
                  {entry.date}
                </span>
                <p className="mt-2 text-[1.0625rem] font-semibold text-ink">{entry.title}</p>
              </div>

              <span
                aria-hidden="true"
                className="absolute top-1.5 left-2.5 size-2.5 rounded-full bg-action sm:left-1/2 sm:-translate-x-1/2"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
