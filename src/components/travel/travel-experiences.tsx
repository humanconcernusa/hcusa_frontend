import Image from "next/image";
import type { TravelPageContent } from "@/content/travel";

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

        <ul className="mx-auto mt-12 grid max-w-[64rem] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => (
            <li key={item.name} className="relative overflow-hidden rounded-card">
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
