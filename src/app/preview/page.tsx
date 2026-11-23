import { PreviewClient } from "./preview-client";

/*
  A tab for the admin, showing a page's saved draft. It is never linked from the site and never
  listed. The token in the address is the only way in, and it expires after 30 minutes.
*/
export const metadata = {
  title: "Preview | Human Concern USA",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return <PreviewClient />;
}
