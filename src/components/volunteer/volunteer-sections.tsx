import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import {
  ClipboardIcon,
  CommunityIcon,
  FoodIcon,
  FundraisingIcon,
  ReliefIcon,
} from "@/components/volunteer/volunteer-icons";
import type { VolunteerPageContent } from "@/content/volunteer";

/*
  The four bands the Volunteer page does not share with any other. Every glyph is drawn in
  volunteer-icons.tsx, which is what lets each card animate.
*/
const OPPORTUNITY_GLYPHS = [CommunityIcon, FoodIcon, FundraisingIcon, ReliefIcon];

/* Why Your Time Matters: a centred heading, a wide photo, one dark button. */
export function WhyYourTime({ content }: { content: VolunteerPageContent["why"] }) {
  return (
    <section className="bg-surface pt-8 pb-20 lg:pt-12 lg:pb-28">
      <div className="container-page">
        <h2 className="text-center text-[2rem] leading-[1.05] font-semibold lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <p className="mx-auto mt-5 max-w-[48rem] text-center text-[1rem] leading-relaxed text-body">
          {content.body}
        </p>

        <div className="relative mx-auto mt-10 aspect-[3/1] w-full max-w-[44rem] overflow-hidden rounded-card">
          <Image
            src={content.image}
            alt={content.imageAlt}
            fill
            sizes="(min-width: 768px) 44rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink
            variant="darkHover"
            size="lg"
            href="https://volunteer.bloomerang.co/volunteer/#/join-party?k=7tzvzeb38wawsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* Volunteer Opportunities: four cards, each a pale tile above a left-aligned label. */
export function Opportunities({ content }: { content: VolunteerPageContent["opportunities"] }) {
  return (
    <section className="bg-page pt-8 pb-20 lg:pt-12 lg:pb-28">
      <div className="container-page">
        <p className="text-center text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
          {content.eyebrow}
        </p>

        <h2 className="mt-4 text-center text-[2rem] leading-[1.05] font-semibold lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
        </h2>

        <ul className="mt-12 grid gap-5 grid-cols-2 lg:grid-cols-4">
          {content.cards.map((card, index) => {
            const Glyph = OPPORTUNITY_GLYPHS[index];

            return (
              <li
                key={card.title}
                className="rounded-card border border-line bg-surface md:p-6 p-4 shadow-card"
              >
                <span className="grid md:size-14 size-12 place-items-center rounded-xl bg-tint">
                  <Glyph className="md:size-10 size-8" />
                </span>

                <p className="mt-5 md:text-[1.0625rem]  font-medium text-ink">{card.title}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <ButtonLink
            variant="darkHover"
            size="lg"
            href="https://volunteer.bloomerang.co/volunteer/#/join-party?k=7tzvzeb38wawsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* Real Experiences from Our Volunteers: the dark band, text left, photo right. */
export function VolunteerExperiences({
  content,
}: {
  content: VolunteerPageContent["experiences"];
}) {
  return (
    <section id="volunteer-with-us" className="scroll-mt-28 bg-ink py-20 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 py-1 pr-4 pl-1">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-action">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/volunteer/heart.svg" alt="" className="size-[18px]" />
            </span>
            <span className="text-[0.75rem] font-medium tracking-[0.14em] text-white uppercase">
              {content.eyebrow}
            </span>
          </span>

          <h2 className="mt-5 text-[2rem] leading-[1.05] font-semibold text-white lg:text-[3rem]">
            {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
            {content.headingEnd}
          </h2>

          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-[1rem] leading-relaxed text-white/75">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="relative aspect-[5/4] overflow-hidden rounded-card">
          <Image
            src={content.image}
            alt={content.imageAlt}
            fill
            sizes="(min-width: 1024px) 32rem, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* What to Expect When You Join: four numbered steps, one dark button. */
export function ExpectSteps({ content }: { content: VolunteerPageContent["steps"] }) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page">
        <p className="text-center text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
          {content.eyebrow}
        </p>

        <h2 className="mt-4 text-center text-[2rem] leading-[1.05] font-semibold lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step, index) => (
            <li key={step} className="relative rounded-card border border-line bg-surface p-6 shadow-card">
              <ClipboardIcon className="absolute top-5 right-5 size-5 text-body/40" />

              <p className="flex items-center gap-2">
                {/* The dot, with a ring pulsing out of it. The ring is the dot's own box, pushed
                    outward by outline-offset, so it stays centred on the dot. */}
                <span aria-hidden="true" className="relative grid size-2 shrink-0 place-items-center">
                  <span className="absolute inset-0 animate-dot-ping rounded-full outline outline-1 outline-action" />
                  <span className="size-2 rounded-full bg-action" />
                </span>
                <span className="text-[0.6875rem] font-semibold tracking-[0.12em] text-action uppercase">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
              </p>

              <p className="mt-3 pr-8 text-[1.0625rem] font-semibold text-ink">{step}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <ButtonLink
            variant="darkHover"
            size="lg"
            href="https://volunteer.bloomerang.co/volunteer/#/join-party?k=7tzvzeb38wawsx"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
