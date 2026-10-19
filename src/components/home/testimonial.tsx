import { Eyebrow, Media } from "@/components/ui";
import type { HomeContent } from "@/content/home";

export function Testimonial({ content }: { content: HomeContent["testimonial"] }) {
  return (
    <section className="bg-inverse py-14 lg:py-20">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h2 className="mt-4 text-center text-[2.25rem] leading-[1.1] font-semibold text-white lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>{" "}
          {content.headingEnd}
        </h2>

        {/*
          On phones the photo leads, inset inside the card with its own rounded corners, and
          the quote follows. From md up it sits flush on the right as before.
        */}
        <figure className="mx-auto mt-8 flex max-w-[52rem] flex-col-reverse overflow-hidden rounded-card bg-surface shadow-raised md:mt-10 md:flex-row">
          <div className="relative flex flex-1 flex-col justify-center px-5 pt-6 pb-10 text-center md:p-8 lg:p-10">
            <blockquote className="relative mt-2 text-[1rem] leading-relaxed font-normal text-ink md:text-body">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-28 -left-4 font-serif text-[10rem] leading-none text-line select-none rotate-180"
              >
                &ldquo;
              </span>
              <span className="relative">&ldquo;{content.quote}&rdquo;</span>
            </blockquote>

            <figcaption className="relative mt-6">
              <p className="text-[1.125rem] font-semibold text-ink md:text-[0.875rem] md:font-bold">
                {content.author}
              </p>
              <p className="mt-0.5 text-[1.125rem] text-leaf md:text-[0.8125rem] md:font-bold">
                {content.supporter}
              </p>
            </figcaption>
          </div>

          {/*
            A fixed height on phones. A min-height alone gave the fill image nothing to size
            against, so it collapsed to nothing.
          */}
          <div className="relative mx-5 mt-5 h-[12rem] overflow-hidden rounded-2xl md:m-0 md:h-auto md:min-h-[17.5rem] md:w-[18.125rem] md:rounded-none">
            <Media
              src={content.image}
              alt={content.imageAlt}
              sizes="(min-width: 768px) 290px, 100vw"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
