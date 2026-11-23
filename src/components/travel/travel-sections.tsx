import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import type { TravelPageContent } from "@/content/travel";

/* About Travel With Human Concern USA: a centred heading, the paragraph, the wide photo, one button. */
export function AboutTravel({ content }: { content: TravelPageContent["about"] }) {
  return (
    <section className="bg-surface pt-20 lg:pt-28 pb-10">
      <div className="container-page">
        <h2 className="mx-auto max-w-[46rem] text-center text-[2rem] leading-[1.1] font-semibold lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <p className="mx-auto mt-5 max-w-[62rem] text-center text-[0.9375rem] leading-relaxed text-body">
          {content.body}
        </p>

        <div className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-[60rem] overflow-hidden rounded-card">
          <Image
            src={content.image}
            alt={content.imageAlt}
            fill
            sizes="(min-width: 1024px) 60rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink variant="darkHover" size="lg" href="/about-us">
            {content.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* How It Works: a rule under the heading, then the four numbered cards. */
export function HowItWorks({ content }: { content: TravelPageContent["how"] }) {
  return (
    <section className="bg-surface pt-8 pb-20 lg:pt-12 lg:pb-28">
      <div className="container-page">
        <p className="text-center text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
          {content.eyebrow}
        </p>

        <h2 className="mt-4 text-center text-[2rem] leading-[1.05] font-semibold lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
        </h2>

        <div className="mt-10 border-t border-line" />

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-line bg-surface p-6">
              <p className="flex items-center gap-2">
                <span aria-hidden="true" className="h-4 w-1 bg-action" />
                <span className="text-[0.6875rem] font-bold tracking-[0.12em] text-action uppercase">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
              </p>

              <p className="mt-3 border-t border-action/30 pt-3 text-[1.0625rem] font-semibold text-ink">
                {step.title}
              </p>

              <p className="mt-2 text-[0.9375rem] leading-relaxed font-semibold text-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
