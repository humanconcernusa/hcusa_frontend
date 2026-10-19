import { ButtonLink, Eyebrow, Media } from "@/components/ui";
import type { HomeContent } from "@/content/home";

export function CeoMessage({ content }: { content: HomeContent["ceoMessage"] }) {
  return (
    <section id="about" className="bg-page pt-20 pb-12 lg:py-28">
      <div className="container-page">
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <h2 className="mt-2 text-center text-[2.25rem] leading-none font-semibold lg:text-[3.25rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
        </h2>
        <p className="mt-5 text-center text-[0.9375rem] font-medium text-ink">{content.subtitle}</p>

        {/*
          At md the photo was 26.5rem of a 728px row, which left the text about 160px and clipped
          the title. It gives up room until lg, where the full 26.5rem comes back.
        */}
        <div className="mt-12 grid gap-10 rounded-[2rem] bg-surface p-6 shadow-card md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:items-stretch md:gap-10 md:p-8 lg:grid-cols-[minmax(0,26.5rem)_minmax(0,1fr)] lg:items-start lg:gap-16 lg:p-12">
          {/*
            Square on phones and from lg up. At md it fills the column instead, because the text
            beside it is much taller and a square left a dead gap underneath.
          */}
          <div className="aspect-square w-full overflow-hidden rounded-2xl md:aspect-auto md:h-full">
            <Media
              src={content.image}
              alt={content.imageAlt}
              sizes="(min-width: 1024px) 424px, (min-width: 768px) 240px, 100vw"
              objectPosition="center 40%"
            />
          </div>

          <div className="md:pt-6">
            <h3 className="text-[1.75rem] font-semibold">{content.title}</h3>

            <blockquote className="mt-5 text-[0.9375rem] leading-[1.7] text-body">
              &ldquo;{content.quote}&rdquo;
            </blockquote>

            <div className="mt-6 text-[0.875rem] leading-relaxed text-body">
              <p>{content.name}</p>
              <p>{content.role}</p>
              <p>{content.org}</p>
            </div>

            {/* Centred with more room above it on phones; left-aligned under the text from md up. */}
            <div className="mt-12 text-center md:mt-8 md:text-left">
              <ButtonLink href="/about-us" variant="secondary">
                {content.cta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
