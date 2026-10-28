import { DonateProvider } from "@/components/donate/donate-context";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedHeader } from "@/content/published";
import { TrackDonationClient } from "./track-donation-client";

/*
  A guest can ask for a link by email, then read the donations that link opens. The page is never
  listed in search results, and the token in the address is the only way in.
*/
export const metadata = {
  title: "Track Your Donation | Human Concern USA",
  description:
    "Open the link we emailed you, or request a new one, to see your donation history.",
  robots: { index: false, follow: false },
};

export default async function TrackDonationPage() {
  const header = await getPublishedHeader();

  return (
    <DonateProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-surface focus:px-6 focus:py-3 focus:text-ink focus:shadow-raised"
      >
        Skip to content
      </a>

      <div className="relative isolate">
        <SiteHeader className="absolute inset-x-0 top-2 z-20" content={header} />

        <main id="main" className="bg-page pt-32 pb-20 lg:pt-[7.5rem] lg:pb-28">
          <div className="container-page">
            <TrackDonationClient />
          </div>
        </main>
      </div>

      <SiteFooter />
    </DonateProvider>
  );
}
