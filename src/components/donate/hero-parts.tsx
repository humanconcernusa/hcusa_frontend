"use client";

import type { CSSProperties } from "react";
import type { StripeAddressElementChangeEvent } from "@stripe/stripe-js";
import confetti from "canvas-confetti";

/*
  The small pieces the hero popup is built from: its icons, its confetti, and two formatting
  helpers. They are here so the form itself is about behaviour rather than markup.
*/

/*
  The billing address Stripe's own fields report. The popup keeps it rather than the step, so
  going back and forward does not lose it, and the card can be confirmed with it.
*/
export type Billing = {
  value: StripeAddressElementChangeEvent["value"];
  complete: boolean;
};

/*
  The donor address the platform expects. A wallet gives the same parts under different names,
  so this is the one shape the submit body uses.
*/
export type DonationAddress = {
  addressLine1: string;
  streetName: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

/*
  Google Pay is enabled. Set this to false to disable the tile without removing the code.
*/
export const GOOGLE_PAY_ENABLED = true;

export function money(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

/* A tier's wording is stored with a leading dash, which the popup drops. */
export function wording(blurb: string): string {
  return blurb.replace(/^\s*-\s*/, "").trim();
}

/* The border colour is set per field, so a missing detail can be marked in place. */
export const detailsField =
  "mt-2 min-h-11 w-full rounded-md border bg-surface px-3 text-[0.9375rem] text-ink outline-none placeholder:text-[#8a8a8a] focus:border-action";

/* The little burst thrown when Monthly is picked: where each dot flies, and its colour. */
export const CONFETTI = [
  { x: "-17px", y: "-13px", delay: "0s", color: "bg-surface" },
  { x: "15px", y: "-15px", delay: "0.05s", color: "bg-[#f0b100]" },
  { x: "19px", y: "2px", delay: "0.1s", color: "bg-leaf" },
  { x: "-19px", y: "4px", delay: "0.12s", color: "bg-[#f0b100]" },
  { x: "8px", y: "15px", delay: "0.08s", color: "bg-surface" },
  { x: "-9px", y: "16px", delay: "0.02s", color: "bg-leaf" },
];

/*
  The full-screen burst thrown when Monthly is picked: one from the left edge, one from the
  right, meeting over the middle of the screen.

  It is drawn into the form's own canvas rather than the library's. The library puts its canvas
  on document.body, where the popup's backdrop-blur layer buries it, so nothing is seen even
  though the particles are firing. Our canvas sits inside the popup, above that blur.
*/
export function throwScreenConfetti(canvas: HTMLCanvasElement): void {
  const fire = confetti.create(canvas, { resize: true, useWorker: false });
  const shared = {
    spread: 65,
    ticks: 220,
    gravity: 0.9,
    decay: 0.93,
    startVelocity: 48,
  };

  void fire({ ...shared, particleCount: 70, angle: 60, origin: { x: 0, y: 0.75 } });
  void fire({ ...shared, particleCount: 70, angle: 120, origin: { x: 1, y: 0.75 } });
}

/* The floating dots around the heart when Monthly is picked. */
export function HeartBurst() {
  return (
    <>
      {CONFETTI.map((dot) => (
        <span
          key={`${dot.x}${dot.y}`}
          style={
            {
              "--x": dot.x,
              "--y": dot.y,
              animationDelay: dot.delay,
            } as CSSProperties
          }
          className={`pointer-events-none absolute top-1/2 left-1/2 size-1.5 hero-confetti-dot rounded-full ${dot.color}`}
        />
      ))}
    </>
  );
}

/* A card mark, drawn inline like the rest of the site's icons. */
export function CardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 shrink-0 fill-none stroke-current stroke-[1.6]"
    >
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 9.5h19" strokeLinecap="round" />
    </svg>
  );
}

/* A wallet mark, next to the card one in the payment chooser. */
export function WalletIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 shrink-0 fill-none stroke-current stroke-[1.6]"
    >
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6H18a1.5 1.5 0 0 1 1.5 1.5V8" />
      <rect x="3" y="8" width="18" height="11" rx="2.5" />
      <path d="M16 13.5h2" strokeLinecap="round" />
    </svg>
  );
}

/* A tick, for the done state. */
export function Tick() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-7 fill-none stroke-white stroke-2"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
