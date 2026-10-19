"use client";

import { useEffect } from "react";

/*
  Drawn when a donation button is pressed but the popup's amounts are not in hand: the donation
  API is either still answering or could not be reached.

  It deliberately never falls back to another form's amounts. Showing a donor the wrong figures
  would be worse than showing nothing.
*/
export function DonatePending({
  open,
  status,
  message,
  onClose,
  onRetry,
}: {
  open: boolean;
  status: "loading" | "error" | "missing";
  message: string;
  onClose: () => void;
  onRetry: () => void;
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

  /*
    "missing" is a button pointing at a form the donation API no longer serves. Saying so beats
    the click that used to do nothing at all, which is what a donor would otherwise see.
  */
  const heading =
    status === "loading"
      ? "Loading the donation form"
      : status === "missing"
        ? "This donation form is not available"
        : "We could not open the donation form";

  const body =
    status === "loading"
      ? "Just a moment."
      : status === "missing"
        ? message || "It may have been unpublished. Try again, or use another way to give."
        : message || "The donation form could not be loaded. Please try again.";

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

        <p aria-live="polite" className="mt-3 text-[0.9375rem] text-body">
          {body}
        </p>

        {status === "loading" ? null : (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 min-h-11 w-full cursor-pointer rounded-full bg-action px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-action-hover"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
