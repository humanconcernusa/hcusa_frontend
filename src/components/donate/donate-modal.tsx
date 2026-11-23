"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import type { DonateForm } from "@/content/donate";
import { HeroForm } from "./donate-hero-form";

/*
  The donation popup.

  There is one design. This used to choose between five layouts from the form's variant, and the
  other four are gone, so every popup the site opens is the same form. Its name, its amounts, its
  monthly amounts, its purposes and its fee all come from the donation platform.

  What is left here is the shell: the overlay, the bar that says the donation is secure, the close
  button, and the behaviour that has nothing to do with the fields inside it. The form itself is
  HeroForm, whose three steps are their own components.
*/

export function DonateModal({
  open,
  form,
  onClose,
  preview = false,
}: {
  open: boolean;
  form: DonateForm;
  onClose: () => void;
  /* A preview tab on the admin's side: the card step is drawn, but Pay takes no money. */
  preview?: boolean;
}) {
  const panel = useRef<HTMLDivElement>(null);
  /* True when the form holds something the donor typed or picked. */
  const [dirty, setDirty] = useState(false);
  /* The second warning before a close that would throw the donor's input away. */
  const [confirmClose, setConfirmClose] = useState(false);
  const keepButton = useRef<HTMLButtonElement>(null);

  /*
    The Monthly burst's canvas. It is drawn into the overlay rather than the panel, because the
    panel's entrance animation leaves a transform on it ("animation-fill-mode: both"). A transform
    makes that element the reference frame for anything fixed inside it, which trapped the confetti
    inside the popup instead of covering the screen.
  */
  const confettiCanvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      /* Escape backs out of the warning first, then asks before leaving a filled form. */
      if (confirmClose) {
        setConfirmClose(false);
        return;
      }
      if (dirty) {
        setConfirmClose(true);
        return;
      }
      onClose();
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [confirmClose, dirty, open, onClose]);

  /* Put the keyboard on the safe choice, not on the one that throws the form away. */
  useEffect(() => {
    if (confirmClose) keepButton.current?.focus();
  }, [confirmClose]);

  useEffect(() => {
    if (!open) return;

    /* Remember what opened the popup, move focus in, and send it back on close. */
    const trigger = document.activeElement as HTMLElement | null;
    panel.current?.focus();

    return () => trigger?.focus();
  }, [open]);

  if (!open) return null;

  /* The X leaves at once when nothing was entered; otherwise it opens the warning. */
  function requestClose() {
    if (dirty) {
      setConfirmClose(true);
      return;
    }
    onClose();
  }

  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !panel.current) return;

    const items = panel.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]',
    );

    if (items.length === 0) return;

    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /*
    A click on the page behind the popup is answered two ways, and the popup stays open so nothing
    filled in is lost: the panel gives a gentle tilt, and the X turns red and settles back. Together
    they point the eye at the one control that closes it.
  */
  function shakePanel(event: MouseEvent<HTMLDivElement>) {
    /* Only a click on the page behind the popup, never one inside the form. */
    if (event.target !== event.currentTarget) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* A tilt only, with no sideways travel, so it reads as a shake rather than a slide. */
    if (!reduceMotion) {
      panel.current?.animate(
        [
          { transform: "rotate(0deg)" },
          { transform: "rotate(-0.5deg)" },
          { transform: "rotate(0.5deg)" },
          { transform: "rotate(-0.25deg)" },
          { transform: "rotate(0.25deg)" },
          { transform: "rotate(0deg)" },
        ],
        { duration: 520, easing: "ease-in-out" },
      );
    }

    const close = panel.current?.querySelector<HTMLElement>('[aria-label="Close"]');
    if (!close) return;

    /*
      The resting colour is read from the button itself, so this cannot drift from the CSS. This
      half runs for everyone, as a colour change is not movement.
    */
    const resting = getComputedStyle(close).color;

    /*
      It waits for the tilt to finish, so the two read as one sequence: the popup shakes, then the X
      swells, turns red and settles back. With reduced motion there is no tilt to wait for.
    */
    close.animate(
      [
        { transform: "scale(1)", color: resting },
        { transform: "scale(1.35)", color: "#e32226" },
        { transform: "scale(1)", color: resting },
      ],
      { duration: 420, delay: reduceMotion ? 0 : 520, easing: "ease-in-out" },
    );
  }

  /* The popup closes only from its own controls, so a stray click on the page behind it cannot
     throw away a half-filled form. */
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto px-4 max-sm:overflow-hidden max-sm:px-0"
      onClick={shakePanel}
    >
      {/*
        The page is blurred behind the popup, not merely dimmed. The wash sits on its own
        layer, so the scrolling container above it cannot clip the blur away.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-black/50 backdrop-blur-md animate-overlay-in"
      />

      {/*
        The Monthly burst's canvas. It sits above the wash, outside the panel, so it covers the
        whole screen and the blur cannot bury it.
      */}
      <canvas
        ref={confettiCanvas}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] size-full"
      />

      {/*
        On a phone the panel is a full-height sheet: the bar stays put at the top and only the
        form below it scrolls, so the pay buttons are never pushed off the screen. From sm up it
        stays the floating card it has always been.
      */}
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-title"
        tabIndex={-1}
        onKeyDown={trapFocus}
        className="relative mx-auto my-8 flex max-h-[95vh] w-full max-w-[26rem] animate-dialog-in flex-col overflow-hidden rounded-2xl bg-surface shadow-raised outline-none max-sm:my-0 max-sm:h-dvh max-sm:max-h-none max-sm:max-w-none max-sm:rounded-none"
      >
        <div
          inert={confirmClose}
          className="flex shrink-0 items-center justify-between px-4 py-2.5 max-sm:border-b max-sm:border-divider"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#eef1f9] px-3 py-1.5 text-[0.8125rem] text-ink">
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
            {preview ? "Preview — not live" : "Secure Donation"}
          </span>

          <button
            type="button"
            onClick={requestClose}
            aria-label="Close"
            className="grid size-9 place-items-center rounded-full text-ink transition-colors hover:bg-page"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5 fill-none stroke-current stroke-2"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/*
          The body scrolls rather than the page, so the panel can never be taller than the
          screen. Its bottom padding is left to the sticky button bar, which is why there is
          none here.
        */}
        <div
          inert={confirmClose}
          className="min-h-0 flex-1 overflow-y-auto px-6 pt-3 pb-0"
        >
          <HeroForm
            form={form}
            onClose={onClose}
            onDirtyChange={setDirty}
            confettiCanvas={confettiCanvas}
            preview={preview}
          />
        </div>

        {confirmClose ? (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-5">
            <div aria-hidden="true" className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

            <div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="leave-donation-title"
              className="relative w-full max-w-[20rem] rounded-2xl border border-line bg-surface p-5 shadow-xl"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-tint text-action">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-4 fill-none stroke-current stroke-2"
                  >
                    <path d="M12 8v5M12 16.5v.5" strokeLinecap="round" />
                  </svg>
                </span>

                <div className="min-w-0">
                  <h3 id="leave-donation-title" className="text-[1rem] font-semibold text-ink">
                    Leave this donation?
                  </h3>
                  <p className="mt-1 text-[0.8125rem] leading-snug text-body">
                    Your details will not be saved.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <button
                  ref={keepButton}
                  type="button"
                  onClick={() => setConfirmClose(false)}
                  className="min-h-11 w-full rounded-md bg-action px-4 text-[0.875rem] font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action/40"
                >
                  Keep donating
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-11 w-full rounded-md border border-line bg-surface px-4 text-[0.875rem] font-semibold text-body transition-colors hover:bg-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action/40"
                >
                  Leave without donating
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
