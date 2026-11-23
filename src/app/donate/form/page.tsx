import { DonateProvider } from "@/components/donate/donate-context";
import { StandaloneForm } from "./standalone-form";

/*
  The shareable page for one simple form. It is linked from the admin's "Copy Form URL" and can be
  opened by anyone with the link; the form itself decides whether it is available.

  Only the form is drawn here: no site header or footer. A donor who opens the link sees the form
  and nothing else, which is how a form shared from the admin is meant to look.
*/
export const metadata = {
  title: "Donate | Human Concern USA",
  robots: { index: false, follow: false },
};

export default function DonateFormPage() {
  return (
    /* The popup's own buttons ask this provider what to open, so it still wraps the form. */
    <DonateProvider>
      <main
        id="main"
        className="flex min-h-dvh justify-center bg-page px-4 py-8 sm:py-12"
      >
        <StandaloneForm />
      </main>
    </DonateProvider>
  );
}
