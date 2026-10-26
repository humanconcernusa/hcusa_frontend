import { getPublishedFooter } from "@/content/published";
import { SiteFooterBody } from "./site-footer-body";

/*
  The footer, which shows on every page. It reads its own content, so the pages render it with no
  props and every page picks up an edit.

  The markup lives in SiteFooterBody, which takes the content as a prop, so the preview tab can
  draw a draft footer without reading the published files.
*/
export async function SiteFooter() {
  const content = await getPublishedFooter();

  return <SiteFooterBody content={content} />;
}
