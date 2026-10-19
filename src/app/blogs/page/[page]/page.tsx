import { notFound } from "next/navigation";

import { BlogsPage, PAGE_SIZE } from "@/components/blogs/blogs-page";
import { getPublishedPosts } from "@/content/published";

/*
  Page two and up of the blog listing. Each page number is a real URL (/blogs/page/2) so it can
  be linked, shared and crawled without a query string.
*/

/* One built page per page number, pages two and up. */
export async function generateStaticParams() {
  const first = await getPublishedPosts(1, PAGE_SIZE);

  /*
    With output: "export", Next refuses a route that generates nothing at all. When the posts fit
    on one page there is nothing to paginate, so a single placeholder is generated and the page
    below turns it away with notFound().
  */
  const extra = Math.max(1, first.pageCount - 1);

  return Array.from({ length: extra }, (_, index) => ({ page: String(index + 2) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;

  return {
    title: `Stories, Insights & Impact — Page ${page} | Human Concern USA`,
    description:
      "Read the latest updates, stories from the field, reflections, and impact highlights from Human Concern USA.",
  };
}

export default async function BlogsPagedRoute({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const wanted = Number(page);

  /* /blogs/page/1 is the same as /blogs, and anything below that is not a page. */
  if (!Number.isInteger(wanted) || wanted < 2) notFound();

  const first = await getPublishedPosts(1, PAGE_SIZE);

  if (wanted > first.pageCount) notFound();

  return <BlogsPage page={wanted} />;
}
