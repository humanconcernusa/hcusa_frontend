import { StandaloneForm } from "./standalone-form";

/*
  The shareable page for one simple form. It is linked from the admin's "Copy Form URL" and can be
  opened by anyone with the link; the form itself decides whether it is available.
*/
export const metadata = {
  title: "Donate | Human Concern USA",
  robots: { index: false, follow: false },
};

export default function DonateFormPage() {
  return <StandaloneForm />;
}
