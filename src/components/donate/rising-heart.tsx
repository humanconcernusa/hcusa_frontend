"use client";

import { createPortal } from "react-dom";

/*
  The heart that floats off the Monthly button.

  It is drawn in a portal on <body> and pinned to a point on screen, with a very high z-index. That
  is the one way to be sure nothing in the popup, the sticky action bar or the page behind it can
  cover the heart while it drifts up.

  The caller measures the button when it is pressed, so this component only draws.
*/

export function RisingHeart({
  trigger,
  left,
  top,
}: {
  /* Changes with every press, so the animation restarts. */
  trigger: number;
  left: number;
  top: number;
}) {
  return createPortal(
    <span
      key={trigger}
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999] -translate-x-1/2"
      style={{ left, top }}
    >
      <svg viewBox="0 0 24 24" className="hero-heart-rise size-8 fill-current text-action">
        <path d="M12 20.1l-1.1-1C6.6 15.2 4.2 13 4.2 10a4.3 4.3 0 0 1 4.3-4.3c1.3 0 2.5.6 3.5 1.6 1-1 2.2-1.6 3.5-1.6A4.3 4.3 0 0 1 19.8 10c0 3-2.4 5.2-6.7 9.1z" />
      </svg>
    </span>,
    document.body,
  );
}
