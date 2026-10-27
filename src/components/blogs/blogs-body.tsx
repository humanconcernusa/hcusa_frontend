import { BlogsHero } from "@/components/blogs/blogs-hero";
import { PostGrid } from "@/components/blogs/blogs-sections";
import { CtaBand } from "@/components/home/cta-band";

import type { BlogPostContent } from "@/content/blog-posts";
import type { BlogsPageContent } from "@/content/blogs";

/*
  The blog listing's bands, with the content and posts handed in.

  It is split from the page so the preview tab can draw a draft listing without reading the
  published files. The page keeps its own header, footer and page number.
*/

export type BlogList = {
  items: BlogPostContent[];
  page: number;
  pageCount: number;
};

const CTA_BAND = {
  headingStart: "Give Hope.",
  headingAccent: "Inspire",
  headingEnd: "Change",
  subtitle: "We'd love to hear from you.",
  primaryCta: "Become a Volunteer",
  secondaryCta: "Travel with Us",
};

export function BlogsBody({ content, posts }: { content: BlogsPageContent; posts: BlogList }) {
  return (
    <>
      {content.visible.hero ? <BlogsHero content={content.hero} /> : null}

      {content.visible.posts ? (
        <PostGrid
          posts={posts.items}
          pager={
            content.visible.pager
              ? { page: posts.page, pageCount: posts.pageCount }
              : undefined
          }
        />
      ) : null}

      {content.visible.ctaBand ? <CtaBand content={CTA_BAND} /> : null}
    </>
  );
}
