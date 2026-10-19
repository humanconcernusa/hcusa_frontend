import { DonateProvider } from "@/components/donate/donate-context";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ButtonLink } from "@/components/ui";
import { getPublishedHeader } from "@/content/published";

/*
  A thank-you page. The popup already thanks the donor itself, so nothing sends them here; this
  stands on its own for anyone who lands on it, and it says what happens next.
*/
export const metadata = {
  title: "Thank You | Human Concern USA",
  robots: { index: false, follow: false },
};

/* What happens next, said plainly. Nothing here promises a figure we have not measured. */
const NEXT_STEPS = [
  "Your receipt is on its way by email, with a PDF.",
  "Your gift goes out with the next distribution to the families waiting on it.",
  "Every programme we run is written up in our reports.",
];

/* The tick, drawn once and used at both sizes. */
function Tick({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`fill-none stroke-white stroke-2 ${className}`}
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function ThankYouPage() {
  const header = await getPublishedHeader();

  return (
    <DonateProvider>
      <div className="relative isolate">
        {/* No hero here, so the floating header needs the room the hero would have given it. */}
        <SiteHeader className="absolute inset-x-0 top-2 z-20" content={header} />

        <main id="main" className="bg-page pt-32 pb-20 lg:pt-[7.5rem] lg:pb-28">
          <div className="container-page">
            <div className="mx-auto max-w-[44rem] animate-rise rounded-card bg-surface px-6 py-12 text-center shadow-raised lg:px-12 lg:py-16">
              {/*
                The medallion: a solid green disc carrying a white tick that beats, with a
                ring that ripples out of it. Both are the site's own animations.
              */}
              <span className="relative mx-auto grid size-20 place-items-center rounded-full bg-leaf">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-ripple rounded-full border-2 border-leaf/50"
                />
                <Tick className="relative size-10 origin-center animate-heartbeat" />
              </span>

              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-leaf/20 bg-leaf/10 px-3.5 py-1.5 text-[0.75rem] font-medium tracking-[0.14em] text-leaf uppercase">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-leaf" />
                Donation received
              </p>

              <h1 className="mt-5 text-[2rem] leading-[1.1] font-semibold lg:text-[2.75rem]">
                Thank you for your <span className="accent">donation</span>
              </h1>

              <p className="mx-auto mt-5 max-w-[48ch] text-[1rem] leading-relaxed text-body">
                Your gift is already at work. Here is what happens next.
              </p>

              <ul className="mx-auto mt-8 grid max-w-[38rem] gap-3 text-left">
                {NEXT_STEPS.map((step) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 rounded-xl border border-leaf/20 bg-leaf/5 p-4 text-[0.9375rem] leading-snug text-body"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-leaf">
                      <Tick className="size-3" />
                    </span>
                    {step}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/" variant="primary" size="lg" className="hover:shadow-raised">
                  Back to home
                </ButtonLink>
                <ButtonLink href="/reports" variant="secondary" size="lg">
                  See our reports
                </ButtonLink>
              </div>
            </div>
          </div>
        </main>
      </div>

      <SiteFooter />
    </DonateProvider>
  );
}
