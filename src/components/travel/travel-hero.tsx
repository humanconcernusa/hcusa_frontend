import Image from "next/image";
import { ButtonLink, Callout } from "@/components/ui";
import type { TravelPageContent } from "@/content/travel";

/*
  The Travel With Us hero. The white card over a photo, like the other appeal heroes, but the red
  word comes first here: "Travel With Us".
*/
export function TravelHero({ content }: { content: TravelPageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      <div className="absolute inset-0 -z-10">
        <Image
          src={content.image}
          alt={content.imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_45%]"
        />
      </div>

      <div className="container-page pt-32 pb-14 lg:min-h-[40rem] lg:pt-[12.5rem] lg:pb-[6rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          <h1 className="text-[2rem] leading-[1.08] font-semibold sm:text-[2.75rem] lg:text-[3.125rem]">
            <span className="accent">{content.headingAccent}</span> {content.headingEnd}
          </h1>

          <Callout className="mt-6 max-w-[34rem] leading-snug">{content.body}</Callout>

          <ButtonLink
            variant="primary"
            size="lg"
            href="#register-your-interest"
            className="mt-6 hover:shadow-raised"
          >
            {content.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
