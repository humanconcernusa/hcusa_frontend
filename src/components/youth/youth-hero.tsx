import Image from "next/image";
import { PodiumIcon } from "@/components/youth/youth-icons";
import type { YouthPageContent } from "@/content/youth";

/*
  The hero. The photo behind a white card: a pale pill with the heart, the three-line heading, and a
  "Learn More" button that runs to the intro band.
*/
export function YouthHero({ content }: { content: YouthPageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      <div className="absolute inset-0 -z-10">
        <Image
          src={content.image}
          alt={content.imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_35%]"
        />
      </div>

      <div className="container-page pt-32 pb-16 lg:min-h-[34rem] lg:pt-[9rem] lg:pb-[6rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-tint px-4 py-2">
            <PodiumIcon className="size-4 md:size-5 shrink-0 origin-center animate-heartbeat text-action" />

            {/* Two explicit lines: the label hugs its text, so no dead space is left before the
                dots at the end of the pill. */}
            <span className="text-[0.725rem] md:text-[1rem] md:leading-[1.15] leading-3 font-medium md:tracking-[0.12em] text-action ">
              {content.eyebrowLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>

            <span
              aria-hidden="true"
              className="size-1 origin-center animate-dot-wave rounded-full bg-action/50"
            />
            <span
              aria-hidden="true"
              className="size-1 origin-center animate-dot-wave rounded-full bg-action/50 [animation-delay:-1350ms]"
            />
            <span
              aria-hidden="true"
              className="size-1 origin-center animate-dot-wave rounded-full bg-action/50 [animation-delay:-1200ms]"
            />
          </span>

          <h1 className="mt-5 text-[2rem] leading-[1.12] font-semibold sm:text-[2.75rem] lg:text-[3.125rem]">
            {content.headingStart}
            <br />
            <span className="accent">{content.headingAccent}</span> {content.headingEnd}
          </h1>

          <LearnMoreButton cta={content.cta} />
        </div>
      </div>
    </section>
  );
}

/*
  Kept apart so the hero reads at a glance: a pale button with a red edge, which is how the
  reference draws "Learn More". It points at the intro band below.
*/
function LearnMoreButton({ cta }: { cta: string }) {
  return (
    <a
      href="#intro"
      className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-action bg-tint px-6 text-[0.9375rem] font-medium text-action transition-colors hover:bg-action hover:text-white"
    >
      {cta}
    </a>
  );
}
