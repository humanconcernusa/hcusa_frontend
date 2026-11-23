import { BlogsBody } from "@/components/blogs/blogs-body";
import { DonateProvider } from "@/components/donate/donate-context";
import { QuickDonate } from "@/components/home/quick-donate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  blogsStore,
  getPublishedHeader,
  getPublishedPosts,
} from "@/content/published";

/*
  The Blogs page, rendered from a page number.

  Pages 2 and up are their own URLs (/blogs/page/2) rather than ?page=N, because a static
  site has no query string to read. Both routes render this, so the markup lives in one place.
*/

/* How many cards a page holds. */
export const PAGE_SIZE = 6;

export async function BlogsPage({ page }: { page: number }) {
  const [content, posts, header] = await Promise.all([
    blogsStore.getPublished(),
    getPublishedPosts(page, PAGE_SIZE),
    getPublishedHeader(),
  ]);

  return (
    <DonateProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-surface focus:px-6 focus:py-3 focus:text-ink focus:shadow-raised"
      >
        Skip to content
      </a>

      {/* The header floats over the hero, so nothing above it needs spacing. */}
      <div className="relative isolate">
        <SiteHeader className="absolute inset-x-0 top-2 z-20" content={header} />

        <main id="main">
          <BlogsBody content={content} posts={posts} />
        </main>
      </div>

      <SiteFooter />
      <QuickDonate />
    </DonateProvider>
  );
}
