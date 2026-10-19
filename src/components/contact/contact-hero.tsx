import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import type { ContactPageContent } from "@/content/contact";

/*
  The Contact Us hero. A photo behind a white card, with the red word first: "Connect with Us", and
  two ways in — write to us, or reach us directly.
*/
export function ContactHero({ content }: { content: ContactPageContent["hero"] }) {
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

      <div className="container-page pt-32 pb-14 lg:min-h-[32rem] lg:pt-[8.5rem] lg:pb-[6rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          <h1 className="text-[2rem] leading-[1.1] font-semibold sm:text-[2.75rem] lg:text-[3.125rem]">
            <span className="accent">{content.headingAccent}</span> {content.headingEnd}
          </h1>

          <p className="mt-5 max-w-[34rem] text-[1rem] leading-relaxed text-body">{content.body}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink variant="primary" size="lg" href="#send-message">
              {content.primaryCta}
            </ButtonLink>
            <ButtonLink
              variant="secondary"
              size="lg"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=info@humanconcernusa.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
