import { PreviewClient } from "./preview-client";

/*
  A preview tab for the admin. It is never linked from the site and never listed, and the token in
  the address is the only way in.
*/
export const metadata = {
  title: "Donation form preview | Human Concern USA",
  robots: { index: false, follow: false },
};

export default function DonatePreviewPage() {
  return (
    <main className="min-h-dvh bg-page">
      <PreviewClient />
    </main>
  );
}
