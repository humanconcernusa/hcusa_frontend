/*
  The Blogs page copy: the hero and which of its bands show. The posts themselves are their
  own list, managed on the Blogs screen — see src/content/blog-posts.ts.
*/

export type BlogsPageContent = {
  visible: Record<"hero" | "posts" | "pager" | "ctaBand", boolean>;

  hero: {
    headingStart: string;
    headingAccent: string;
    body: string;
    image: string;
    imageAlt: string;
  };
};

/* The page's own artwork, saved under public/images/blogs. */
const ASSETS = "/images/blogs";

export const blogsDefaults: BlogsPageContent = {
  visible: {
    hero: true,
    posts: true,
    pager: true,
    ctaBand: true,
  },

  hero: {
    headingStart: "Stories, Insights &",
    headingAccent: "Impact",
    body: "Read the latest updates, stories from the field, reflections, and impact highlights from Human Concern USA.",
    image: `${ASSETS}/hero.jpg`,
    imageAlt: "Children standing among the rubble of destroyed buildings in Gaza",
  },
};
