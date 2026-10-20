import { EmbeddedForm } from "../form/standalone-form";

/*
  The page an embed code points at. It has no header or footer: the page it sits in already has
  those, and this one is meant to fill an iframe.

  It carries the same form and the same payment path as the standalone page. Only the framing
  headers differ, so a WordPress page is allowed to put it in an iframe (see public/_headers).
*/
export const metadata = {
  title: "Donation form | Human Concern USA",
  robots: { index: false, follow: false },
};

export default function DonateEmbedPage() {
  return (
    <main className="min-h-dvh bg-page p-3 sm:p-4">
      <EmbeddedForm />
    </main>
  );
}
