import { DonateProvider } from "@/components/donate/donate-context";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedHeader } from "@/content/published";
import { StandaloneForm } from "./standalone-form";

/*
  The shareable page for one simple form. It is linked from the admin's "Copy Form URL" and can be
  opened by anyone with the link; the form itself decides whether it is available.

  It is a normal page of the site, with the same header and footer as every other page, so a donor
  who arrives here sees the site rather than a floating dialog.
*/
export const metadata = {
  title: "Donate | Human Concern USA",
  robots: { index: false, follow: false },
};

export default async function DonateFormPage() {
  const header = await getPublishedHeader();

  return (
    /* The header carries a donate button, which asks this provider what to open. */
    <DonateProvider>
      <div className="relative isolate">
        {/* No hero here, so the floating header needs the room the hero would have given it. */}
        <SiteHeader className="absolute inset-x-0 top-2 z-20" content={header} />

        <main id="main" className="bg-page pt-32 pb-20 lg:pt-[7.5rem] lg:pb-28">
          <div className="container-page">
            <StandaloneForm />
          </div>
        </main>

        <SiteFooter />
      </div>
    </DonateProvider>
  );
}
