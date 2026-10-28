"use client";

import { useEffect, useState } from "react";

import { fetchRecentDonations, type RecentDonation } from "@/recent-donations";
import { useDonate } from "./donate-context";

/*
  A small notice in the corner with the latest gifts.

  It waits two seconds, shows one gift for six seconds, and moves to the next one. It is hidden
  while the donation popup is open, and Close stops it for the rest of the visit. The words come
  from the platform, already masked, so no full name ever reaches the page.
*/

const FIRST_DELAY_MS = 2000;
const BETWEEN_DELAY_MS = 400;
const SHOW_MS = 6000;
const MAX_ITEMS = 8;

function amountText(item: RecentDonation): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: item.currency || "USD",
      maximumFractionDigits: 0,
    }).format(item.amount);
  } catch {
    return `$${Math.round(item.amount)}`;
  }
}

export function RecentDonationToast() {
  const { isOpen, open } = useDonate();
  const [items, setItems] = useState<RecentDonation[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let active = true;

    void fetchRecentDonations(MAX_ITEMS)
      .then((list) => {
        if (active) setItems(list);
      })
      .catch(() => {
        /* A quiet corner: no notice is better than an error. */
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (dismissed || isOpen || items.length === 0) {
      setVisible(false);
      return undefined;
    }

    const delay = index === 0 ? FIRST_DELAY_MS : BETWEEN_DELAY_MS;

    const show = window.setTimeout(() => setVisible(true), delay);
    const next = window.setTimeout(() => {
      setVisible(false);
      setIndex((current) => (current + 1) % items.length);
    }, delay + SHOW_MS);

    return () => {
      window.clearTimeout(show);
      window.clearTimeout(next);
    };
  }, [dismissed, index, isOpen, items.length]);

  const item = items[index];

  if (!item || !visible || isOpen) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-40 w-[calc(100%-2rem)] max-w-[22rem] animate-dialog-in rounded-xl border border-line bg-surface p-3 shadow-raised max-sm:bottom-3 max-sm:left-3"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-tint text-action">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.8125rem] text-body">
            <span className="font-semibold text-ink">{item.name}</span> donated{" "}
            <span className="font-semibold text-action">{amountText(item)}</span>
          </p>
          {item.place.length > 0 ? (
            <p className="truncate text-[0.75rem] text-body">{item.place}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => open()}
          className="shrink-0 cursor-pointer rounded-full bg-action px-3 py-1.5 text-[0.75rem] font-medium text-white transition-colors hover:bg-action-hover"
        >
          Donate
        </button>

        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            setVisible(false);
          }}
          aria-label="Close"
          className="shrink-0 cursor-pointer text-body transition-colors hover:text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-3.5 fill-none stroke-current stroke-2"
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
