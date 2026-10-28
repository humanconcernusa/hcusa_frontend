"use client";

import { useEffect } from "react";

import {
  donateFallbackDefaults,
  type DonateFallbackContent,
} from "@/content/donate-fallback";

/*
  Drawn when a donation button is pressed but there is no popup to show: the donation API is still
  answering, or it could not open the form at all.

  The words on the unavailable screen are edited in the admin and shared by every page, so one
  change reaches every donate button on the site. The button sends the donor to a fixed payment
  page, which keeps a gift possible while the form cannot be opened.

  It deliberately never falls back to another form's amounts. Showing a donor the wrong figures
  would be worse than showing nothing.
*/

/* Only a web address or a path on this site is used; anything else keeps the shipped link. */
function safeUrl(value: string): string {
  const url = String(value || "").trim();
  return /^(https?:\/\/|\/)/.test(url) ? url : donateFallbackDefaults.buttonUrl;
}

export function DonatePending({
  open,
  status,
  fallback,
  onClose,
}: {
  open: boolean;
  status: "loading" | "unavailable";
  fallback: DonateFallbackContent;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  const heading = status === "loading" ? "Loading the donation form" : fallback.title;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto px-4 max-sm:px-0">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-black/50 backdrop-blur-md animate-overlay-in"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-pending-title"
        className="relative mx-auto my-8 w-full max-w-[26rem] animate-dialog-in rounded-2xl bg-surface p-6 shadow-raised max-sm:my-0 max-sm:rounded-none"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="donate-pending-title" className="font-display text-[1.25rem] text-ink">
            {heading}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer text-body transition-colors hover:text-ink"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current stroke-2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {status === "loading" ? (
          <p aria-live="polite" className="mt-3 text-[0.9375rem] text-body">
            Just a moment.
          </p>
        ) : (
          <>
            <p className="mt-3 text-[0.9375rem] text-body">{fallback.description}</p>

            {fallback.extraText.length > 0 ? (
              <p className="mt-2 text-[0.875rem] text-body">{fallback.extraText}</p>
            ) : null}

            <a
              href={safeUrl(fallback.buttonUrl)}
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-action px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-action-hover"
            >
              {fallback.buttonLabel || donateFallbackDefaults.buttonLabel}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
