"use client";

import { useDonate } from "@/components/donate/donate-context";
import { useQuickDonate } from "@/components/donate/quick-donate-context";

export function QuickDonate() {
  const { open } = useDonate();
  const { label, form } = useQuickDonate();

  /*
    The tab is rotated a half turn so the words read upward, which is the usual direction
    for a side tab. Two consequences of the rotation, both handled here:
      - the rounded corners must be set on the right, so they appear on the left
      - the shadow uses no direction, since a directional one would end up off-screen
    The shift and the rotation are written as one transform, so they cannot fight.
  */
  return (
    <button
      type="button"
      onClick={() => open(form)}
      className="fixed top-1/2 right-0 z-30 hidden items-center gap-2 rounded-r-xl border border-transparent bg-action px-3.5 py-3 text-[0.8125rem] font-medium text-white shadow-[0_0_16px_rgb(10_10_10_/_0.18)] transition-colors hover:border-line hover:bg-surface hover:text-action lg:flex [transform:translateY(-50%)_rotate(180deg)] [writing-mode:vertical-rl]"
    >
      {label}
      {/*
        The tab is turned a half turn so the words read upward. This wrapper turns the icon
        again so the heart ends up a quarter turn counter-clockwise, matching the words. A
        half turn plus a quarter turn clockwise lands on a quarter turn counter-clockwise.

        The wrapper carries the rotation, which leaves the icon free to scale for the beat
        without the two fighting over one transform.
      */}
      <span className="inline-flex [transform:rotate(90deg)]">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-4 shrink-0 origin-center animate-heartbeat fill-current"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </span>
    </button>
  );
}
