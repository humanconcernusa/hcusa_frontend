"use client";

import { useEffect, useRef, useState } from "react";

import type { DonatePreset } from "@/content/donate";
import { FeeSlider } from "./fee-slider";
import { HeartBurst, money, wording } from "./hero-parts";
import { RisingHeart } from "./rising-heart";

/*
  The amount half of the hero popup: the one-time / monthly switch, the stacked list of amounts,
  and the reader's own figure. All the state lives in the form; this only draws it.
*/

export function AmountStep({
  amounts,
  amount,
  value,
  isMonthly,
  showMonthly,
  isCustom,
  feePercent,
  extra,
  amountError,
  showFee,
  onPickCadence,
  onPickAmount,
  onCustomFocus,
  onCustomChange,
  onFeeChange,
}: {
  amounts: DonatePreset[];
  /* What the reader has typed in the custom row, kept as text so a trailing dot survives. */
  amount: string;
  value: number;
  isMonthly: boolean;
  /* False hides the monthly choice entirely: this form does not take monthly gifts. */
  showMonthly: boolean;
  isCustom: boolean;
  feePercent: number;
  extra: number;
  amountError: string;
  /* The admin can put a slider on this popup; it waits until an amount is picked. */
  showFee: boolean;
  onPickCadence: (monthly: boolean) => void;
  onPickAmount: (amount: number) => void;
  onCustomFocus: () => void;
  onCustomChange: (raw: string) => void;
  onFeeChange: (percent: number) => void;
}) {
  /* Where the floating heart starts: the small heart inside the Monthly choice. */
  const monthlyHeartRef = useRef<HTMLSpanElement | null>(null);

  /* The heart is placed from the button's own position, measured on the press. */
  const [heart, setHeart] = useState<{ left: number; top: number; key: number } | null>(null);
  const heartTimer = useRef<number | null>(null);
  const heartCount = useRef(0);

  useEffect(
    () => () => {
      if (heartTimer.current) window.clearTimeout(heartTimer.current);
    },
    [],
  );

  function pickCadence(monthly: boolean) {
    const starting = monthly && !isMonthly;

    onPickCadence(monthly);

    if (!starting) return;

    const rect = monthlyHeartRef.current?.getBoundingClientRect();
    if (!rect) return;

    /* A plain counter, so every press gets a fresh key and the animation restarts. */
    heartCount.current += 1;
    setHeart({ left: rect.left + rect.width / 2, top: rect.top, key: heartCount.current });

    if (heartTimer.current) window.clearTimeout(heartTimer.current);
    heartTimer.current = window.setTimeout(() => setHeart(null), 3900);
  }

  return (
    <>
      {/*
        The one-time / monthly switch. Monthly only appears when the form's admin turned it on, and
        that switch travels with the form: the platform refuses a monthly gift for a form that has
        not allowed one, so offering it would be a dead end.
      */}
      <div className="relative mt-4 flex rounded-full bg-page p-1" hidden={!showMonthly}>
        {/* The pill slides between the two choices instead of jumping from one to the other. */}
        <span
          aria-hidden="true"
          className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-action transition-transform duration-[250ms] ease-[cubic-bezier(0.2,0,0,1)] ${
            isMonthly ? "translate-x-full" : "translate-x-0"
          }`}
        />

        {[
          { label: "One-time", monthly: false },
          { label: "Monthly", monthly: true },
        ].map((option) => {
          const selected = isMonthly === option.monthly;

          return (
            <button
              key={option.label}
              type="button"
              onClick={() => pickCadence(option.monthly)}
              aria-pressed={selected}
              className={`relative z-10 flex min-h-9 flex-1 items-center justify-center gap-2 rounded-full px-4 text-[0.875rem] font-semibold whitespace-nowrap transition-colors ${
                selected ? "text-white" : "text-body hover:text-ink"
              }`}
            >
              {option.monthly ? (
                /* The heart lies flat and grey until Monthly is picked, then it beats. */
                <span ref={monthlyHeartRef} aria-hidden="true" className="relative inline-flex">
                  <span className={selected ? "inline-flex animate-bump" : "inline-flex"}>
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className={`size-5 ${selected ? "fill-white" : "fill-body"}`}
                    >
                      <path d="M12 20.1l-1.1-1C6.6 15.2 4.2 13 4.2 10a4.3 4.3 0 0 1 4.3-4.3c1.3 0 2.5.6 3.5 1.6 1-1 2.2-1.6 3.5-1.6A4.3 4.3 0 0 1 19.8 10c0 3-2.4 5.2-6.7 9.1z" />
                    </svg>
                  </span>

                  {selected ? <HeartBurst /> : null}
                </span>
              ) : null}
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Drawn on <body> with a high z-index, so nothing in the popup can cover it. */}
      {heart ? (
        <RisingHeart trigger={heart.key} left={heart.left} top={heart.top} />
      ) : null}

      <div className="mt-4 flex flex-col gap-2">
        {amounts.map((preset, index) => {
          const selected = !isCustom && value === preset.amount;
          const text = wording(preset.blurb);

          return (
            <button
              key={index}
              type="button"
              onClick={() => onPickAmount(preset.amount)}
              aria-pressed={selected}
              className={`flex w-full items-center gap-3 rounded-lg border p-1.5 text-left transition-colors ${
                selected ? "border-action" : "border-line hover:border-action/40"
              }`}
            >
              <span
                className={`grid min-w-[3.75rem] shrink-0 place-items-center rounded-md px-1.5 py-[10.25px] text-[0.9375rem] font-semibold ${
                  selected ? "bg-action text-white" : "bg-page text-ink"
                }`}
              >
                {money(preset.amount)}
              </span>

              {text.length > 0 ? (
                <span className="text-[0.875rem] leading-snug text-body">{text}</span>
              ) : null}
            </button>
          );
        })}

        {/* The custom row is the reader's own figure, typed in place of a tier. */}
        <label
          className={`flex w-full items-center gap-3 rounded-lg border p-1.5 transition-colors focus-within:border-action ${
            isCustom ? "border-action" : "border-line"
          }`}
        >
          <span
            className={`grid min-w-[3.75rem] shrink-0 place-items-center rounded-md px-1.5 py-[10.25px] text-[0.9375rem] font-semibold ${
              isCustom ? "bg-action text-white" : "bg-page text-ink"
            }`}
          >
            $
          </span>

          <input
            type="text"
            inputMode="decimal"
            value={isCustom ? amount : ""}
            onFocus={onCustomFocus}
            onChange={(event) => onCustomChange(event.target.value)}
            placeholder="Enter a custom amount"
            aria-label="Custom donation amount in dollars"
            className="min-h-0 w-full rounded-md bg-transparent text-[0.9375rem] text-ink outline-none placeholder:text-[#8a8a8a]"
          />
        </label>
      </div>

      {amountError.length > 0 ? (
        <p role="alert" className="mt-2 text-[0.8125rem] text-action">
          {amountError}
        </p>
      ) : null}

      {showFee ? (
        <>
          <FeeSlider value={feePercent} onChange={onFeeChange} />

          <p className="mt-3 text-[0.8125rem] leading-snug text-body">
            {feePercent > 0 ? (
              <>
                I&apos;ll give an additional{" "}
                <span className="font-semibold text-ink">{feePercent}%</span>, equivalent to{" "}
                <span className="font-semibold text-ink">{money(extra)}</span>, to help cover
                processing fees and other costs.
              </>
            ) : (
              "No extra added."
            )}
          </p>
        </>
      ) : null}
    </>
  );
}
