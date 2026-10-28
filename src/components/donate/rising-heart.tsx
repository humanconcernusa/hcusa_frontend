"use client";

import { useEffect, useState, type RefObject } from "react";
import { createPortal } from "react-dom";

/*
  The heart that floats off the Monthly button.

  It is drawn in a portal on <body> and pinned to the button's place on screen, with a very high
  z-index. That is the one way to be sure nothing in the popup, the sticky action bar or the page
  behind it can cover the heart while it drifts up.
*/

export function RisingHeart({
  trigger,
  anchorRef,
}: {
  /* Bumped by the form each time Monthly is picked; 0 means nothing to draw. */
  trigger: number;
  anchorRef: RefObject<HTMLElement | null>;
}) {
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    if (trigger === 0) {
      setPosition(null);
      return;
    }

    const rect = anchorRef.current?.getBoundingClientRect();
    if (!rect) return;

    setPosition({ left: rect.left + rect.width / 2, top: rect.top });
  }, [anchorRef, trigger]);

  if (!position) return null;

  return createPortal(
    <span
      key={trigger}
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999] -translate-x-1/2"
      style={{ left: position.left, top: position.top }}
    >
      <svg viewBox="0 0 24 24" className="hero-heart-rise size-8 fill-current text-action">
        <path d="M12 20.1l-1.1-1C6.6 15.2 4.2 13 4.2 10a4.3 4.3 0 0 1 4.3-4.3c1.3 0 2.5.6 3.5 1.6 1-1 2.2-1.6 3.5-1.6A4.3 4.3 0 0 1 19.8 10c0 3-2.4 5.2-6.7 9.1z" />
      </svg>
    </span>,
    document.body,
  );
}
