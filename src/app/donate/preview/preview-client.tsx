"use client";

import { useEffect, useState } from "react";
import { DonateModal } from "@/components/donate/donate-modal";
import { fetchPreviewForm } from "@/donation-forms";
import type { DonateForm } from "@/content/donate";

/*
  The popup as the admin's draft, drawn by the site that donors use.

  The token arrives in the query string. It is the only thing that grants access and it dies after
  30 minutes, so an old link shows the expiry message rather than a blank popup.
*/
export function PreviewClient() {
  const [form, setForm] = useState<DonateForm | null>(null);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    /* Read from the address rather than useSearchParams, so the page stays a plain static page. */
    const token = new URLSearchParams(window.location.search).get("token")?.trim() ?? "";

    if (token.length === 0) {
      setError("This page needs a preview link.");
      setIsLoaded(true);

      return () => {
        active = false;
      };
    }

    void fetchPreviewForm(token)
      .then((loaded) => {
        if (!active) return;
        setForm(loaded);
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
  }, []);

  /* The tab was opened from the admin, so closing it is the natural way out. */
  function close() {
    window.close();
    window.history.back();
  }

  if (!isLoaded) {
    return <p className="p-8 text-center text-body">Loading preview…</p>;
  }

  if (!form) {
    return (
      <div className="mx-auto max-w-[34rem] p-8 text-center">
        <p className="text-body">{error}</p>
        <p className="mt-2 text-[0.875rem] text-body">Open the admin and press Preview again.</p>
      </div>
    );
  }

  return <DonateModal open form={form} onClose={close} preview />;
}
