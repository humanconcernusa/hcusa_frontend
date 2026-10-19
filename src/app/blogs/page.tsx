import { BlogsPage } from "@/components/blogs/blogs-page";

/*
  Page one of the blog listing. Pages two and up live at /blogs/page/N — their own URLs, since
  the static build has no query string to read.
*/

export const metadata = {
  title: "Stories, Insights & Impact | Human Concern USA",
  description:
    "Read the latest updates, stories from the field, reflections, and impact highlights from Human Concern USA.",
};

export default async function BlogsPageRoute() {
  return <BlogsPage page={1} />;
}
