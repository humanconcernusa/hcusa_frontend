import Image from "next/image";
import type { TravelPageContent } from "@/content/travel";
import { TravelExperiencesCarousel } from "./travel-experiences-carousel";

/*
  Travel Experiences: three portrait photos, each with the child's letter over a dark gradient up
  from the foot of the frame.
*/
export function TravelExperiences({ content }: { content: TravelPageContent["experiences"] }) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container-page">
        <p className="text-center text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
          {content.eyebrow}
        </p>

        <h2 className="mt-4 text-center text-[2rem] leading-[1.05] font-semibold lg:text-[3rem]">
          {content.headingStart} <span className="accent">{content.headingAccent}</span>
        </h2>

        <div className="mx-auto mt-12 max-w-[64rem] md:hidden">
          <TravelExperiencesCarousel>
            {content.items.map((item) => (
              <article key={item.name} className="relative h-full overflow-hidden rounded-card">
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 22rem, 100vw"
                  className="object-cover"
                />
              </div>

              {/* The gradient rises from the foot so the letter stays readable. */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent px-6 pt-20 pb-6">
                <p className="text-[1.0625rem] font-semibold text-white">{item.name}</p>
                <p className="text-[0.9375rem] text-white/80">{item.programme}</p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-white/75">{item.letter}</p>
              </div>
              </article>
            ))}
          </TravelExperiencesCarousel>
        </div>

        <ul className="mx-auto mt-12 hidden max-w-[64rem] lg:gap-6 gap-4 md:grid md:grid-cols-3">
          {content.items.map((item) => (
            <li key={item.name} className="relative overflow-hidden rounded-card">
              <div className="relative md:aspect-[3/5] lg:aspect-[3/4]">
                <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 768px) 22rem, 100vw" className="object-cover" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent lg:px-6 px-4 pt-20 pb-6">
                <p className="text-[1.0625rem] font-semibold text-white">{item.name}</p>
                <p className="text-[0.9375rem]  text-white/80">{item.programme}</p>
                <p className="mt-3 text-[0.875rem] md:leading-tight lg:leading-relaxed text-white/75">{item.letter}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
