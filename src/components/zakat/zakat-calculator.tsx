"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { ZakatPageContent } from "@/content/zakat";

/* Zakat is one fortieth of what is held above the nisab. */
const ZAKAT_RATE = 0.025;

/*
  Every box the reader can fill in, in the order they run down the panel. The two metals carry a
  rate hint; the rest are plain amounts.

  "liabilities" is money owed, so it comes off the total rather than adding to it.
*/
const ASSET_KEYS = ["cash", "gold", "silver", "business", "shares", "retirement", "other"];

const FIELDS: { key: string; label: string; hint?: "gold" | "silver" }[] = [
  { key: "cash", label: "Cash at Home/Bank" },
  { key: "gold", label: "Gold (Value)", hint: "gold" },
  { key: "silver", label: "Silver (Value)", hint: "silver" },
  { key: "business", label: "Business Assets" },
  { key: "shares", label: "Shares & Investments" },
  { key: "retirement", label: "RRSP / Retirement" },
  { key: "liabilities", label: "Liabilities (Debts you owe)" },
  { key: "other", label: "Other Zakatable Assets" },
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function amount(input: string | undefined): number {
  const parsed = Number.parseFloat(input ?? "");
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/*
  The calculator itself: the two thresholds, the eight boxes and the three figures that follow
  them. It keeps its own figures, so it can sit on a page or inside the popup without either
  knowing about the other.
*/
export function ZakatCalculatorForm({ rates }: { rates: ZakatPageContent["calculator"] }) {
  const [values, setValues] = useState<Record<string, string>>({});

  const assets = ASSET_KEYS.reduce((sum, key) => sum + amount(values[key]), 0);
  const liabilities = amount(values.liabilities);
  const net = Math.max(0, assets - liabilities);

  /*
    Nothing is due below the nisab. The silver figure decides it, because it is the lower of the
    two thresholds and therefore the safer line for the poor.
  */
  const due = net >= rates.silver.value ? net * ZAKAT_RATE : 0;

  return (
    <>
      {/* The two thresholds, as the design has them. */}
      <div className="grid gap-5 sm:grid-cols-2">
        {[rates.gold, rates.silver].map((metal, index) => (
          <div
            key={index}
            className="rounded-lg border-l-4 border-leaf bg-page px-5 py-4 text-center"
          >
            <p className="text-[0.75rem] font-semibold tracking-[0.14em] text-body uppercase">
              {index === 0 ? "Gold Nisab" : "Silver Nisab"}
            </p>
            <p className="mt-1 text-[1.125rem] font-semibold text-leaf">
              {money.format(metal.value)} ({metal.weight})
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <label key={field.key} className="block">
            <span className="text-[0.9375rem] font-semibold text-ink">{field.label}</span>

            {field.hint ? (
              <span className="mt-0.5 block text-[0.75rem] text-leaf">
                {field.hint === "gold" ? rates.gold.rate : rates.silver.rate}
              </span>
            ) : null}

            <span className="mt-2 flex items-stretch rounded-md border border-line focus-within:border-action">
              <span
                aria-hidden="true"
                className="grid w-10 place-items-center border-r border-line text-[0.9375rem] text-body"
              >
                $
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={values[field.key] ?? ""}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field.key]: event.target.value.replace(/[^0-9.]/g, ""),
                  }))
                }
                placeholder="0.00"
                className="min-h-11 w-full rounded-md bg-transparent px-3 text-[0.9375rem] text-ink outline-none placeholder:text-[#8a8a8a]"
              />
            </span>
          </label>
        ))}
      </div>

      {/* The three figures, worked out as the reader types. */}
      <div className="mt-8 grid gap-4 rounded-xl bg-ink px-6 py-6 sm:grid-cols-3">
        <div className="rounded-lg border border-white/20 px-4 py-3 text-center">
          <p className="text-[0.75rem] font-semibold tracking-[0.1em] text-white/70 uppercase">
            Total Assets
          </p>
          <p className="mt-2 text-[1.25rem] font-semibold text-white">{money.format(assets)}</p>
        </div>

        <div className="rounded-lg border border-white/20 px-4 py-3 text-center">
          <p className="text-[0.75rem] font-semibold tracking-[0.1em] text-white/70 uppercase">
            Liabilities
          </p>
          <p className="mt-2 text-[1.25rem] font-semibold text-white">
            {money.format(liabilities)}
          </p>
        </div>

        <div className="rounded-lg border border-white/20 px-4 py-3 text-center">
          <p className="text-[0.75rem] font-semibold tracking-[0.1em] text-white/70 uppercase">
            Total Zakat Due
          </p>
          <p className="mt-2 text-[1.5rem] font-semibold text-leaf">{money.format(due)}</p>
        </div>
      </div>
    </>
  );
}

/* The popup that carries the same form on the Zakat page. */
export function ZakatCalculator({
  open,
  onClose,
  rates,
}: {
  open: boolean;
  onClose: () => void;
  rates: ZakatPageContent["calculator"];
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    /* Remember what opened the popup, move focus in, and send it back on close. */
    const trigger = document.activeElement as HTMLElement | null;
    panel.current?.focus();

    return () => trigger?.focus();
  }, [open]);

  if (!open) return null;

  /* Keeps Tab inside the popup, so the page behind it stays out of reach. */
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-4 py-8 animate-overlay-in"
      onClick={onClose}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="zakat-calculator-title"
        tabIndex={-1}
        onKeyDown={trapFocus}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-[40rem] animate-dialog-in rounded-2xl bg-surface px-6 pt-12 pb-8 shadow-raised outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full text-body transition-colors hover:bg-page"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-4 fill-none stroke-current stroke-2"
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <h2
          id="zakat-calculator-title"
          className="text-center text-[2rem] leading-[1.1] font-semibold lg:text-[2.5rem]"
        >
          {rates.headingStart} <span className="accent">{rates.headingAccent}</span>
        </h2>

        <p className="mt-2 text-center text-[1rem] text-body">{rates.body}</p>

        <div className="mt-8">
          <ZakatCalculatorForm rates={rates} />
        </div>
      </div>
    </div>
  );
}
