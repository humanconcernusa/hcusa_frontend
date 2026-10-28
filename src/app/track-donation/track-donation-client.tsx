"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  fetchTrackedDonation,
  fetchTrackedDonations,
  HUMAN_CONCERN_LOGIN_URL,
  requestTrackLink,
  TrackError,
  type TrackedDonation,
  type TrackedDonationsPage,
  type TrackLinkResult,
} from "@/donation-tracking";

/*
  The guest side of tracking: ask for a link by email, then read the donations that link opens.

  The token in the address is the only grant, so the page never shows another person's gifts. The
  API answers only this site's donations because the request carries the source filter.
*/

const INVALID_LINK = "This link is invalid or has expired. Request a new one.";

const INPUT_CLASS =
  "mt-1 min-h-11 w-full rounded-md border border-line bg-surface px-3 text-base text-ink outline-none focus:border-action";

function money(amount: number, currency: string): string {
  const value = Number.isFinite(amount) ? amount : 0;
  const code = String(currency || "USD").toUpperCase();

  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: code }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

function dateText(value?: string | null): string {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function isRecurring(item: TrackedDonation): boolean {
  return String(item.paymentMode || "") === "split" || Boolean(item.scheduleType);
}

function statusTone(key: string): string {
  switch (String(key || "").toLowerCase()) {
    case "succeeded":
      return "text-leaf";
    case "failed":
      return "text-action";
    default:
      return "text-body";
  }
}

function EmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<TrackLinkResult | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = email.trim();
    setError("");
    setResult(null);

    if (value.length === 0) {
      setError("Enter the email address you used when donating.");
      return;
    }

    setIsSending(true);

    try {
      setResult(await requestTrackLink(value));
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "The link could not be sent. Please try again.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-[36rem]">
      <h1 className="text-[2rem] leading-tight font-semibold text-ink sm:text-[2.5rem]">
        Track Your Donation
      </h1>
      <p className="mt-3 text-[1rem] leading-relaxed text-body">
        Enter the email address you used when donating. We will email you a secure link to your
        donation history. The link works for 30 minutes.
      </p>

      <form onSubmit={submit} className="mt-6 rounded-card border border-line bg-surface p-6">
        <label htmlFor="track-email" className="block text-[0.875rem] font-medium text-ink">
          Email address
        </label>
        <input
          id="track-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error.length > 0) setError("");
          }}
          placeholder="you@example.com"
          autoComplete="email"
          disabled={isSending}
          className={INPUT_CLASS}
        />

        {error.length > 0 ? (
          <p className="mt-2 text-[0.875rem] text-action">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={isSending}
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-action px-6 font-medium text-white transition-colors hover:bg-action-hover disabled:opacity-60"
        >
          {isSending ? "Sending link…" : "Email me a link"}
        </button>
      </form>

      {result ? (
        <div className="mt-4 rounded-card border border-line bg-surface p-5">
          <p className="text-[0.9375rem] leading-relaxed text-body">
            {result.message || "If we found donations for that email, we've sent a link."}
          </p>

          {result.registered && HUMAN_CONCERN_LOGIN_URL.length > 0 ? (
            <a
              href={HUMAN_CONCERN_LOGIN_URL}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-action px-6 font-medium text-white transition-colors hover:bg-action-hover"
            >
              Log in to your account
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Details({ item }: { item: TrackedDonation }) {
  const rows = Array.isArray(item.installments) ? item.installments : [];

  return (
    <div className="mt-4 border-t border-divider pt-4">
      <dl className="grid gap-2 text-[0.8125rem] sm:grid-cols-2">
        <div className="flex justify-between gap-4 sm:block">
          <dt className="text-body">Reference</dt>
          <dd className="text-right text-ink sm:text-left">{item.donationId}</dd>
        </div>
        <div className="flex justify-between gap-4 sm:block">
          <dt className="text-body">Type</dt>
          <dd className="text-right text-ink sm:text-left">
            {isRecurring(item) ? "Recurring" : "One-time"}
          </dd>
        </div>
        {item.tipAmount > 0 ? (
          <div className="flex justify-between gap-4 sm:block">
            <dt className="text-body">Platform support</dt>
            <dd className="text-right text-ink sm:text-left">
              {money(item.tipAmount, item.currency)}
            </dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-4 sm:block">
          <dt className="text-body">Status</dt>
          <dd className={`text-right sm:text-left ${statusTone(item.status?.key)}`}>
            {item.status?.label || "—"}
          </dd>
        </div>
      </dl>

      {rows.length > 0 ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-[0.8125rem]">
            <thead>
              <tr className="border-b border-divider text-body">
                <th className="py-2 pr-4 font-medium">#</th>
                <th className="py-2 pr-4 font-medium">Date</th>
                <th className="py-2 pr-4 font-medium">Amount</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.installmentIndex}-${row.dueDate}`} className="border-b border-divider/60">
                  <td className="py-2 pr-4 text-body">{row.installmentIndex}</td>
                  <td className="py-2 pr-4 text-ink">{dateText(row.dueDate)}</td>
                  <td className="py-2 pr-4 text-ink">{money(row.amount, item.currency)}</td>
                  <td className={`py-2 ${statusTone(row.status)}`}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}

function DonationCard({ token, item }: { token: string; item: TrackedDonation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState<TrackedDonation | null>(null);

  const recurring = isRecurring(item);
  const summary = item.scheduleSummary;
  const next = Array.isArray(summary?.upcoming) ? summary.upcoming[0] : null;

  async function toggle() {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
    if (details) return;

    setIsLoading(true);
    setError("");

    try {
      setDetails(await fetchTrackedDonation(token, item.donationId));
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "The details could not be loaded.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <li className="rounded-card border border-line bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-ink">{item.campaign?.name || "Donation"}</p>
          <p className="mt-1 text-[0.8125rem] text-body">
            {dateText(item.date)}
            {item.causeTag?.label ? ` · ${item.causeTag.label}` : ""}
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold text-ink">{money(item.amount, item.currency)}</p>
          <p className={`text-[0.8125rem] ${statusTone(item.status?.key)}`}>
            {item.status?.label || "—"}
          </p>
        </div>
      </div>

      {recurring && summary ? (
        <p className="mt-3 text-[0.8125rem] leading-relaxed text-body">
          {summary.paidCount} of {summary.total} payments made ·{" "}
          {money(summary.paidTotal, item.currency)} paid
          {next ? ` · next ${money(next.amount, item.currency)} on ${dateText(next.dueDate)}` : ""}
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => void toggle()}
        className="mt-3 text-[0.8125rem] font-medium text-action underline underline-offset-4"
      >
        {isOpen ? "Hide details" : "View details"}
      </button>

      {isOpen ? (
        isLoading ? (
          <p className="mt-3 text-[0.8125rem] text-body">Loading details…</p>
        ) : error.length > 0 ? (
          <p className="mt-3 text-[0.8125rem] text-action">{error}</p>
        ) : details ? (
          <Details item={details} />
        ) : null
      ) : null}
    </li>
  );
}

function DonationList({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState<TrackedDonationsPage | null>(null);

  /*
    The caller keys this component by token, so a new link mounts a fresh state and the effect has
    nothing to reset synchronously. That keeps the hooks rule happy and avoids a flash of the old
    list.
  */
  useEffect(() => {
    let active = true;

    void fetchTrackedDonations(token)
      .then((data) => {
        if (active) {
          setPage(data);
          setIsLoading(false);
        }
      })
      .catch((caught: unknown) => {
        if (!active) return;

        setError(
          caught instanceof TrackError && caught.code === "TRACK_LINK_INVALID"
            ? INVALID_LINK
            : caught instanceof Error
              ? caught.message
              : "We could not load your donations.",
        );
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token]);

  if (isLoading) {
    return <p className="py-10 text-center text-body">Checking your link…</p>;
  }

  if (error.length > 0) {
    return (
      <div className="mx-auto max-w-[36rem] rounded-card border border-line bg-surface p-6 text-center">
        <h1 className="text-[1.25rem] font-semibold text-ink">We could not open that link</h1>
        <p className="mt-2 text-[0.9375rem] text-body">{error}</p>
        <Link
          href="/track-donation"
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-action px-6 font-medium text-white transition-colors hover:bg-action-hover"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  if (!page) return null;

  if (page.items.length === 0) {
    return (
      <div className="mx-auto max-w-[36rem] rounded-card border border-line bg-surface p-6 text-center">
        <h1 className="text-[1.25rem] font-semibold text-ink">No donations found</h1>
        <p className="mt-2 text-[0.9375rem] text-body">
          We could not find a donation for {page.email || "that email"} on this site.
        </p>
        <Link
          href="/track-donation"
          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-line px-6 font-medium text-ink transition-colors hover:bg-page"
        >
          Use another email
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[52rem]">
      <h1 className="text-[2rem] leading-tight font-semibold text-ink sm:text-[2.5rem]">
        Your donations
      </h1>
      <p className="mt-2 text-[0.9375rem] text-body">
        Showing donations for <span className="font-medium text-ink">{page.email}</span>.
      </p>

      <ul className="mt-6 flex flex-col gap-4">
        {page.items.map((item) => (
          <DonationCard key={item.donationId} token={token} item={item} />
        ))}
      </ul>

      <Link
        href="/track-donation"
        className="mt-6 inline-block text-[0.875rem] text-action underline underline-offset-4"
      >
        Use another email
      </Link>
    </div>
  );
}

function TrackBody() {
  const searchParams = useSearchParams();
  const token = (searchParams.get("token") ?? "").trim();

  return token.length > 0 ? <DonationList key={token} token={token} /> : <EmailForm />;
}

export function TrackDonationClient() {
  return (
    <Suspense fallback={<p className="py-10 text-center text-body">Loading…</p>}>
      <TrackBody />
    </Suspense>
  );
}
