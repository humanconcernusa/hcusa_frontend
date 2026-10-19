import { notFound } from "next/navigation";
import { BlogPostHero } from "@/components/blogs/blog-post-hero";
import { BlogPostBody, BlogPostPager } from "@/components/blogs/blog-post-sections";
import { DonateProvider } from "@/components/donate/donate-context";
import { CtaBand } from "@/components/home/cta-band";
import { QuickDonate } from "@/components/home/quick-donate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getAllPosts,
  getPostBySlug,
  getPublishedHeader,
} from "@/content/published";

/*
  A blog post page. Every post is served from here, by its slug — the same design the hand-built
  Eid page used, so all posts read alike.
*/

/* How many posts sit down the side of an article. */
const RECENT_COUNT = 4;

/* The closing band on this page. */
const CTA_BAND = {
  headingStart: "Give Hope.",
  headingAccent: "Inspire",
  headingEnd: "Change",
  subtitle: "We'd love to hear from you.",
  primaryCta: "Become a Volunteer",
  secondaryCta: "Travel with Us",
};

/* Every published post becomes its own built page. */
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

/* Nothing outside that list resolves, so the build holds exactly the published posts. */
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Post not found | Human Concern USA" };

  return { title: `${post.title} | Human Concern USA`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [post, all, header] = await Promise.all([
    getPostBySlug(slug),
    getAllPosts(),
    getPublishedHeader(),
  ]);

  if (!post) notFound();

  const index = all.findIndex((item) => item.slug === post.slug);
  const recent = all.filter((item) => item.slug !== post.slug).slice(0, RECENT_COUNT);
  const previous = index > 0 ? all[index - 1] : null;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

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
          <BlogPostHero post={post} />
          <BlogPostBody post={post} recent={recent} />
          <BlogPostPager previous={previous} next={next} />
          <CtaBand content={CTA_BAND} />
        </main>
      </div>

      <SiteFooter />
      <QuickDonate />
    </DonateProvider>
  );
}
