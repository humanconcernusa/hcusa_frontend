import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import type { CareerPageContent } from "@/content/careers";

/* The tick inside each pink tile on the Why band. */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* The clock and pin beside the job's hours and location. */
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* Why You'll Love Working at HCUSA: six points beside the photo. */
export function WhyHcusa({ content }: { content: CareerPageContent["why"] }) {
  return (
    <section className="bg-surface pt-8 pb-20 lg:pt-12 lg:pb-28">
      <div className="container-page">
        <p className="text-center text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
          {content.eyebrow}
        </p>

        <h2 className="mt-4 text-center text-[2rem] leading-[1.05] font-semibold lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <p className="mt-4 text-center text-[0.9375rem] text-body">{content.lead}</p>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ul className="grid gap-6 sm:grid-cols-2">
            {content.points.map((point) => (
              <li key={point} className="flex items-center gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-action/20 bg-tint">
                  <CheckIcon className="size-4 text-action" />
                </span>
                <p className="text-[1.0625rem] leading-relaxed font-semibold text-body">{point}</p>
              </li>
            ))}
          </ul>

          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image
              src={content.image}
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 32rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Featured Job Openings: one card per opening in the content. */
export function FeaturedJobOpenings({ content }: { content: CareerPageContent["jobs"] }) {
  return (
    <section id="jobs" className="scroll-mt-28 bg-page pt-8 pb-20 lg:pt-12 lg:pb-28">
      <div className="container-page">
        <h2 className="text-center text-[2rem] leading-[1.05] font-semibold lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <div className="mx-auto mt-12 max-w-[30rem] space-y-6">
          {content.items.map((job) => (
            <article
              key={job.headingStart}
              className="rounded-card border border-line bg-surface p-7 shadow-card lg:p-8"
            >
              <p className="flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.12em] text-leaf uppercase">
                <span
                  aria-hidden="true"
                  className="grid size-4 place-items-center rounded-full border border-leaf/40 text-leaf"
                >
                  <CheckIcon className="size-2.5" />
                </span>
                {job.eyebrow}
              </p>

              <h3 className="mt-3 text-[1.5rem] leading-tight font-semibold">
                {job.headingStart} <span className="accent">{job.headingAccent}</span>
              </h3>

              <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-body">
                <span className="flex items-center gap-2">
                  <ClockIcon className="size-4" />
                  {job.hours}
                </span>
                <span className="flex items-center gap-2">
                  <PinIcon className="size-4" />
                  {job.location}
                </span>
              </p>

              {job.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[0.9375rem] leading-relaxed text-body">
                  {paragraph}
                </p>
              ))}

              <p className="mt-5 border-l-2 border-action pl-4 text-[0.9375rem] leading-relaxed text-body italic">
                {job.quote}
              </p>

              <div className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-6">
                <p className="text-[0.75rem] font-medium tracking-[0.12em] text-body uppercase">
                  {job.deadline}
                </p>
                <ButtonLink href={job.url} target="_blank" rel="noopener noreferrer">
                  {job.cta}
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
