import Image from "next/image";
import type { BlogsPageContent } from "@/content/blogs";

/*
  The Blogs hero. Like the appeal heroes — a white card over a photo — but it carries only a heading
  and a line of text: no pill, and no button, as the reference has it.
*/
export function BlogsHero({ content }: { content: BlogsPageContent["hero"] }) {
  return (
    <section className="relative isolate bg-inverse">
      <div className="absolute inset-0 -z-10">
        <Image
          src={content.image}
          alt={content.imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_50%]"
        />
      </div>

      <div className="container-page pt-32 pb-14 lg:min-h-[24rem] lg:pt-[7.5rem] lg:pb-[6rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          <h1 className="text-[2rem] leading-[1.08] font-semibold sm:text-[2.75rem] lg:text-[3.125rem]">
            {content.headingStart}
            <br />
            <span className="accent">{content.headingAccent}</span>
          </h1>

          <p className="mt-5 max-w-[34rem] text-[1rem] leading-relaxed text-body">{content.body}</p>
        </div>
      </div>
    </section>
  );
}
