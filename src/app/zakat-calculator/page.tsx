import { DonateProvider } from "@/components/donate/donate-context";
import { QuickDonate } from "@/components/home/quick-donate";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ZakatCalculatorForm } from "@/components/zakat/zakat-calculator";
import { getPublishedHeader, zakatStore } from "@/content/published";

/*
  A page for the calculator on its own, reached from the header's Zakat Calculator link. It draws
  the same figures and the same form as the popup on the Zakat page, from the same content.
*/
export const metadata = {
  title: "Zakat Calculator | Human Concern USA",
  description:
    "Work out the Zakat due on your wealth. Enter what you hold against the gold and silver nisab and see the total as you type.",
};

export default async function ZakatCalculatorPage() {
  const [content, header] = await Promise.all([
    zakatStore.getPublished(),
    getPublishedHeader(),
  ]);

  const rates = content.calculator;

  return (
    <DonateProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-surface focus:px-6 focus:py-3 focus:text-ink focus:shadow-raised"
      >
        Skip to content
      </a>

      {/* The header floats, so the page carries the room it would have been given by a hero. */}
      <div className="relative isolate">
        <SiteHeader className="absolute inset-x-0 top-2 z-20" content={header} />

        <main id="main" className="bg-page pt-32 pb-20 lg:pt-[7.5rem] lg:pb-28">
          <div className="container-page">
            <div className="mx-auto max-w-[44rem] rounded-card bg-surface px-6 py-12 shadow-card lg:px-10 lg:py-14">
              <h1 className="text-center text-[2.25rem] leading-[1.1] font-semibold lg:text-[3rem]">
                {rates.headingStart} <span className="accent">{rates.headingAccent}</span>
              </h1>

              <p className="mt-3 text-center text-[1rem] text-body">{rates.body}</p>

              <div className="mt-8">
                <ZakatCalculatorForm rates={rates} showStickyTotal />
              </div>
            </div>
          </div>
        </main>
      </div>

      <SiteFooter />
      <QuickDonate />
    </DonateProvider>
  );
}
