"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HeroForm } from "@/components/donate/donate-hero-form";
import { fetchDonationForms } from "@/donation-forms";
import type { DonateForm } from "@/content/donate";

/*
  One donation form, on a page of its own.

  This is the shareable link for a simple form: no popup, no modal, just the form drawn in the
  page. It uses the same HeroForm the popup uses, so the fields, the fee slider and the card step
  are the same ones, and the payment still goes to the donation platform.

  The slug arrives in the query string because the site is a static export: a path per form cannot
  be generated at build time, since forms are created later in the admin.
*/
function StandaloneBody() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = (searchParams.get("slug") ?? "").trim();

  const [form, setForm] = useState<DonateForm | null>(null);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const confettiCanvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (slug.length === 0) return;

    let active = true;

    /* Only published forms are in this list, so an unpublished link says so instead of guessing. */
    void fetchDonationForms()
      .then((forms) => {
        if (!active) return;

        const found = forms.find((row) => row.id === slug) ?? null;
        if (!found) setError("This donation form is not available.");

        setForm(found);
        setIsLoaded(true);
      })
      .catch((caught: unknown) => {
        if (!active) return;

        setError(
          caught instanceof Error ? caught.message : "The donation form could not be loaded.",
        );
        setIsLoaded(true);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (slug.length === 0) {
    return (
      <p className="p-8 text-center text-body">
        This link is missing the form name. Ask for the form link again.
      </p>
    );
  }

  if (!isLoaded) {
    return <p className="p-8 text-center text-body">Loading the form…</p>;
  }

  if (!form) {
    return (
      <div className="mx-auto max-w-[34rem] p-8 text-center">
        <p className="text-body">{error}</p>
        <p className="mt-2 text-[0.875rem] text-body">
          This form may not be published yet. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-[30rem]">
        <section className="rounded-card border border-line bg-surface">
          {/* The popup's top bar, in the same place and the same shape. No close button here. */}
          <div className="flex items-center px-4 py-2.5">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eef1f9] px-3 py-1.5 text-[0.8125rem] text-ink">
              <ShieldIcon />
              Secure Donation
            </span>
          </div>

          <div className="px-6 pt-3 pb-6">
            {/* The same form the popup draws, on the page instead of in a dialog. */}
            <HeroForm
              form={form}
              onClose={() => router.push("/")}
              confettiCanvas={confettiCanvas}
            />
          </div>
        </section>
      </div>

      {/* The Monthly burst is drawn here, above the page, as it is in the popup. */}
      <canvas
        ref={confettiCanvas}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] size-full"
      />
    </>
  );
}

/* The same shield the popup draws beside its "Secure Donation" line. */
function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 fill-none stroke-current stroke-[1.8]"
    >
      <path
        d="M12 3l7 2.6v5.1c0 4.4-2.9 7.9-7 9.3-4.1-1.4-7-4.9-7-9.3V5.6z"
        strokeLinejoin="round"
      />
      <path d="M9 11.9l2 2 4-4.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* `useSearchParams` needs a Suspense boundary, which this supplies. */
export function StandaloneForm() {
  return (
    <Suspense fallback={<p className="p-8 text-center text-body">Loading the form…</p>}>
      <StandaloneBody />
    </Suspense>
  );
}
