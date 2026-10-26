"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QuickDonateProvider } from "@/components/donate/quick-donate-context";
import { PreviewPage } from "@/components/preview/preview-pages";
import { fetchPreview, type SitePreview } from "@/preview";

/*
  Reads the token from the address, loads the frozen draft from the CMS, and draws the page the
  admin asked to preview.

  The token is the only thing that grants access, so nothing is cached: a minute after it expires
  the same link shows the expiry message.
*/
function PreviewBody() {
  const searchParams = useSearchParams();
  const token = (searchParams.get("token") ?? "").trim();

  const [preview, setPreview] = useState<SitePreview | null>(null);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (token.length === 0) return;

    let active = true;

    void fetchPreview(token)
      .then((loaded) => {
        if (!active) return;

        setPreview(loaded);
        setIsLoaded(true);
      })
      .catch((caught: unknown) => {
        if (!active) return;

        setError(caught instanceof Error ? caught.message : "The preview could not be loaded.");
        setIsLoaded(true);
      });

    return () => {
      active = false;
    };
  }, [token]);

  if (token.length === 0) {
    return (
      <div className="mx-auto max-w-[34rem] p-8 text-center">
        <p className="text-body">This page needs a preview link.</p>
        <p className="mt-2 text-[0.875rem] text-body">Open the admin and press Preview.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return <p className="p-8 text-center text-body">Loading preview…</p>;
  }

  if (!preview) {
    return (
      <div className="mx-auto max-w-[34rem] p-8 text-center">
        <p className="text-body">{error}</p>
        <p className="mt-2 text-[0.875rem] text-body">Open the admin and press Preview again.</p>
      </div>
    );
  }

  /* The draft Quick Donate tab overrides the layout's published one for this subtree. */
  return (
    <QuickDonateProvider value={preview.payload.quickDonate}>
      <PreviewPage page={preview.page} payload={preview.payload} />
    </QuickDonateProvider>
  );
}

/* `useSearchParams` needs a Suspense boundary, which this supplies for the whole page. */
export function PreviewClient() {
  return (
    <Suspense fallback={<p className="p-8 text-center text-body">Loading preview…</p>}>
      <PreviewBody />
    </Suspense>
  );
}
