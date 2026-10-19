import Image from "next/image";
import type { BlogPostContent } from "@/content/blog-posts";

/*
  The blog post hero. The same white card over a photo as the other pages, holding only the
  post's title and its date.
*/
export function BlogPostHero({ post }: { post: BlogPostContent }) {
  return (
    <section className="relative isolate bg-inverse">
      <div className="absolute inset-0 -z-10">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_50%]"
        />
      </div>

      <div className="container-page pt-32 pb-24 lg:min-h-[30rem] lg:pt-[7.5rem] lg:pb-[9rem]">
        <div className="max-w-[35.22rem] rounded-card bg-surface p-7 shadow-raised lg:p-8">
          <h1 className="text-[1.75rem] leading-none font-medium sm:text-[2.25rem] lg:text-[2.5rem]">
            {post.title}
          </h1>

          <p className="mt-5 flex items-center gap-2 border-l-4 border-action bg-tint px-4 py-3 text-[0.9375rem] text-body">
            {/* The red calendar: a solid body, a light header line, and two binder tabs. */}
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 shrink-0">
              <rect x="7" y="2.5" width="2" height="4" rx="1" className="fill-action" />
              <rect x="15" y="2.5" width="2" height="4" rx="1" className="fill-action" />
              <rect x="3" y="4.5" width="18" height="16" rx="3" className="fill-action" />
              <rect x="3" y="9.5" width="18" height="1.2" className="fill-tint" />
            </svg>
            {post.date}
          </p>
        </div>
      </div>
    </section>
  );
}
