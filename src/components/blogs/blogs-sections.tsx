import Image from "next/image";
import Link from "next/link";
import { hasArticleBody, type BlogPostContent } from "@/content/blog-posts";

/*
  The post cards, three across. Each thumbnail already carries its category badge, so nothing is
  drawn over it here.

  A card links to its post only once that post has words behind it, so a thin page is never
  offered.
*/
export function PostGrid({
  posts,
  pager,
}: {
  posts: BlogPostContent[];
  pager?: { page: number; pageCount: number };
}) {
  return (
    /* One section, so the cards and the pager share a background — and the bottom is kept short,
       because the Give Hope band below brings its own large top padding. */
    <section className="bg-surface pt-16 pb-6 lg:pt-20 lg:pb-6">
      <div className="container-page">
        {posts.length === 0 ? (
          <p className="text-[1rem] text-body">No posts yet. Check back soon.</p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-shadow hover:shadow-raised"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 22rem, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-[1.125rem] leading-snug font-semibold text-ink">
                    {post.title}
                  </h2>

                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-body">
                    {post.excerpt}
                  </p>

                  {hasArticleBody(post) ? (
                    <Link
                      href={`/${post.slug}`}
                      className="mt-5 text-[0.75rem] font-semibold tracking-[0.12em] text-action uppercase"
                    >
                      Read More »
                    </Link>
                  ) : (
                    <p className="mt-5 text-[0.75rem] font-semibold tracking-[0.12em] text-action uppercase">
                      Read More »
                    </p>
                  )}

                  <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] text-body">
                    {post.date}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {pager && pager.pageCount > 1 ? (
          <div className="mt-14">
            <PostPager pager={pager} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* Shows the first, the last and the pages either side of the current one. */
function pageNumbers(current: number, count: number): (number | "gap")[] {
  if (count <= 7) return Array.from({ length: count }, (_, index) => index + 1);

  const wanted = [1, current - 1, current, current + 1, count]
    .filter((page) => page >= 1 && page <= count)
    .sort((a, b) => a - b);

  const out: (number | "gap")[] = [];
  let previous = 0;

  for (const page of wanted) {
    if (previous > 0 && page - previous > 1) out.push("gap");
    out.push(page);
    previous = page;
  }

  return out;
}

/*
  The page links under the grid. Page one lives at /blogs; the rest are their own URLs, so the
  numbers can be opened, shared and crawled like any other link.
*/
export function PostPager({ pager }: { pager: { page: number; pageCount: number } }) {
  const href = (page: number) => (page === 1 ? "/blogs" : `/blogs/page/${page}`);

  const linkClass =
    "grid size-9 place-items-center rounded-full border border-line text-[0.875rem] font-medium text-body transition-colors hover:bg-page";

  return (
    <nav aria-label="Blog pages">
      <ul className="flex items-center justify-center gap-2">
        {pager.page > 1 ? (
          <li>
            <Link href={href(pager.page - 1)} className="px-2 text-[0.875rem] font-medium text-action">
              ‹ Previous
            </Link>
          </li>
        ) : null}

        {pageNumbers(pager.page, pager.pageCount).map((page, index) =>
          page === "gap" ? (
            <li
              key={`gap-${index}`}
              aria-hidden="true"
              className="grid size-9 place-items-center text-[0.875rem] text-body"
            >
              …
            </li>
          ) : (
            <li key={page}>
              {page === pager.page ? (
                <span
                  aria-current="page"
                  className="grid size-9 place-items-center rounded-full bg-action text-[0.875rem] font-medium text-white"
                >
                  {page}
                </span>
              ) : (
                <Link href={href(page)} className={linkClass}>
                  {page}
                </Link>
              )}
            </li>
          ),
        )}

        {pager.page < pager.pageCount ? (
          <li>
            <Link href={href(pager.page + 1)} className="px-2 text-[0.875rem] font-medium text-action">
              Next ›
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
