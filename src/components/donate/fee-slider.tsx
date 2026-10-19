"use client";

import { useState } from "react";
import { MAX_FEE_PERCENT } from "@/content/donate";

/* A dot per tick, at every fifth percent. */
const TICKS = [0, 5, 10, 15, 20];

/*
  The extra-percentage slider for the hero popup.

  A range input is drawn by the browser, so the thumb is styled in styles/components.css under
  .fee-slider.
  The groove, the fill and the glow are drawn here instead, because their widths come from the
  value; the input sits transparently on top and keeps its native behaviour, including the arrow
  keys, Home and End, and dragging on a touch screen.
*/
export function FeeSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [isSliding, setIsSliding] = useState(false);
  const filled = `${(value / MAX_FEE_PERCENT) * 100}%`;

  return (
    <div className="mt-4">
      <div className="relative flex h-5 items-center">
        {/*
          The figure above the thumb. It stays mounted so it can settle in and out rather than
          appearing from nowhere; the clamp keeps it inside the ends, so at 0% and 20% it stops
          rather than hanging off the side. It is hidden from screen readers, which already hear the
          value from the input itself.
        */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-full mb-1 origin-bottom -translate-x-1/2 rounded-full bg-action px-2 py-0.5 text-[0.6875rem] font-semibold text-white transition-all duration-150 ease-out ${
            isSliding ? "translate-y-0 scale-100 opacity-100" : "translate-y-1 scale-90 opacity-0"
          }`}
          style={{ left: `clamp(1.25rem, ${filled}, calc(100% - 1.25rem))` }}
        >
          {value}%
        </span>

        {/* The groove. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 h-2 rounded-full bg-page shadow-[inset_0_1px_2px_rgb(10_10_10_/_0.15)]"
        />

        {/* The glow behind the filled part, then the filled part itself. */}
        <div
          aria-hidden="true"
          className="absolute h-2 rounded-full bg-action/40 blur-[6px] transition-[width] duration-200"
          style={{ width: filled }}
        />
        <div
          aria-hidden="true"
          className="absolute h-2 rounded-full bg-action transition-[width] duration-200"
          style={{ width: filled }}
        />

        <label htmlFor="hero-fee-percent" className="sr-only">
          Extra percentage to help cover costs
        </label>
        <input
          id="hero-fee-percent"
          type="range"
          min={0}
          max={MAX_FEE_PERCENT}
          step={1}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          /* The figure appears while the slider is held or focused, and goes when it is let go. */
          onPointerDown={() => setIsSliding(true)}
          onPointerUp={() => setIsSliding(false)}
          onPointerCancel={() => setIsSliding(false)}
          onFocus={() => setIsSliding(true)}
          onBlur={() => setIsSliding(false)}
          className="fee-slider relative z-10 h-5 w-full"
        />
      </div>

      {/* The scale under the track. A dot is red once the figure has reached it. */}
      <div aria-hidden="true" className="mt-2 flex justify-between px-[11px]">
        {TICKS.map((tick) => (
          <span
            key={tick}
            className={`size-1 rounded-full ${tick <= value ? "bg-action" : "bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}
