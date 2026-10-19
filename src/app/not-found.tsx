import { DonateProvider } from "@/components/donate/donate-context";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink } from "@/components/ui";
import { getPublishedHeader } from "@/content/published";

/*
  The not-found page. Next renders this for any URL that has no page, and the static export
  writes it out as 404.html, which is what the hosts serve a visitor who mistypes an address.

  It is wrapped in DonateProvider because the header carries the donate button, and that
  button reads the popup's state from the provider.
*/
export const metadata = {
  title: "Page not found | Human Concern USA",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const header = await getPublishedHeader();

  return (
    <DonateProvider>
      <div className="relative isolate">
        {/* No hero on this page, so the floating header needs the room a hero would have given it. */}
        <SiteHeader className="absolute inset-x-0 top-2 z-20" content={header} />

        <main id="main" className="bg-page pt-32 pb-20 lg:pt-[7.5rem] lg:pb-28">
          <div className="container-page">
            <div className="mx-auto max-w-[44rem] animate-rise rounded-card bg-surface px-6 py-12 text-center shadow-raised lg:px-12 lg:py-16">
              <p className="text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
                404
              </p>

              <h1 className="mt-4 text-[2rem] leading-[1.1] font-semibold lg:text-[2.75rem]">
                We couldn&rsquo;t find that <span className="accent">page</span>
              </h1>

              <p className="mx-auto mt-5 max-w-[48ch] text-[1rem] leading-relaxed text-body">
                The link may be old, or the address may have a typo. Here are a few places to go
                instead.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/" variant="primary" size="lg" className="hover:shadow-raised">
                  Back to home
                </ButtonLink>
                <ButtonLink href="/blogs" variant="secondary" size="lg">
                  Read our stories
                </ButtonLink>
                <ButtonLink href="/reports" variant="secondary" size="lg">
                  See our reports
                </ButtonLink>
              </div>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </DonateProvider>
  );
}
