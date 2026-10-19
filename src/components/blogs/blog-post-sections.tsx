import Image from "next/image";
import Link from "next/link";
import { hasArticleBody, type BlogPostContent } from "@/content/blog-posts";

/*
  The article beside the "Recent posts" sidebar, and the Previous / Next strip under it.
*/

/* The article, with the recent posts down the right side. */
export function BlogPostBody({
  post,
  recent,
}: {
  post: BlogPostContent;
  recent: BlogPostContent[];
}) {
  return (
    <section className="bg-surface pt-16 lg:pt-20">
      <div className="container-page mx-auto grid max-w-[68rem] gap-12 lg:grid-cols-[1.9fr_1fr] lg:gap-14">
        <article>
          {post.lead.map((paragraph) => (
            <p key={paragraph} className="text-[1rem] leading-relaxed text-body">
              {paragraph}
            </p>
          ))}

          {post.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mt-10 text-[1.5rem] leading-tight font-semibold lg:text-[1.75rem]">
                {section.heading}
              </h2>

              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[1rem] leading-relaxed text-body">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          {post.closing.map((paragraph) => (
            <p key={paragraph} className="mt-6 text-[1rem] leading-relaxed text-body">
              {paragraph}
            </p>
          ))}
        </article>

        {recent.length > 0 ? (
          <aside>
            <h2 className="rounded-lg bg-action px-4 py-3 text-center text-[1.25rem] font-semibold text-white">
              Recent posts
            </h2>

            <ul className="mt-6 flex flex-col">
              {recent.map((item) => (
                <li
                  key={item.slug}
                  className="border-b border-action/40 py-5 first:pt-0 last:border-b-0"
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 20rem, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <h3 className="mt-3 text-[0.9375rem] leading-snug font-semibold text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[0.75rem] text-leaf">{item.date}</p>

                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-body">{item.excerpt}</p>

                  {hasArticleBody(item) ? (
                    <Link
                      href={`/${item.slug}`}
                      className="mt-2 inline-block text-[0.75rem] font-semibold tracking-[0.12em] text-action uppercase"
                    >
                      Read More »
                    </Link>
                  ) : (
                    <p className="mt-2 text-[0.75rem] font-semibold tracking-[0.12em] text-action uppercase">
                      Read More »
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </section>
  );
}

/* The previous / next strip. Each side links to its post when there is one. */
export function BlogPostPager({
  previous,
  next,
}: {
  previous: BlogPostContent | null;
  next: BlogPostContent | null;
}) {
  if (!previous && !next) return null;

  return (
    <section className="bg-surface pb-16 lg:pb-20">
      <div className="container-page mx-auto max-w-[68rem]">
        <div className="flex items-start justify-between gap-8 border-t border-line pt-8">
          {previous ? (
            <Link href={`/${previous.slug}`} className="group flex items-start gap-3">
              <span aria-hidden="true" className="mt-0.5 text-[1.5rem] leading-none text-ink">
                ‹
              </span>
              <span>
                <span className="block text-[0.75rem] font-semibold tracking-[0.12em] text-action uppercase">
                  Previous
                </span>
                <span className="mt-1 block max-w-[22rem] text-[0.9375rem] text-body group-hover:text-ink">
                  {previous.title}
                </span>
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link href={`/${next.slug}`} className="group flex items-start gap-3 text-right">
              <span>
                <span className="block text-[0.75rem] font-semibold tracking-[0.12em] text-action uppercase">
                  Next
                </span>
                <span className="mt-1 block max-w-[22rem] text-[0.9375rem] text-body group-hover:text-ink">
                  {next.title}
                </span>
              </span>
              <span aria-hidden="true" className="mt-0.5 text-[1.5rem] leading-none text-ink">
                ›
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </section>
  );
}
