"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  AddressElement,
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import { stripeLook } from "@/stripe-key";
import { TURNSTILE_ENABLED } from "@/turnstile";
import { TurnstileBox } from "@/components/turnstile/turnstile-box";
import {
  MONTHLY_TERM,
  finalizeDonation,
  newPaymentKey,
  type StartedDonation,
} from "@/donation-payments";
import { money, type Billing } from "./hero-parts";

/*
  The card step of the hero popup: what the charge is made of, then Stripe's own card and billing
  fields, then Pay. Nothing here talks to our server except resolvePayment, which the form owns.

  The fields are drawn from the platform's default gateway key, and the payment is pinned to that
  same gateway when Pay is pressed. So the account the card was drawn for is the account that
  charges it, and the key the platform answers with is the one already on the page. Drawing on one
  account and charging on another is what used to fail on the last press.

  One-time and monthly differ only at the last moment. One-time charges the card. Monthly saves it
  and asks the platform to record the plan, because the later payments are charged by the platform.
*/

/*
  The card fields and the Pay button. It sits inside <Elements>, so it can reach the loaded
  Stripe object and the field the donor is filling in.
*/
function CardFields({
  resolvePayment,
  isMonthly,
  payLabel,
  preview = false,
  name,
  email,
  billing,
  onBillingChange,
  onPaid,
  onBack,
}: {
  /* Starts the payment, and answers with the secret and, for monthly, the plan's two ids. */
  resolvePayment: (turnstileToken: string) => Promise<StartedDonation>; 
  isMonthly: boolean;
  /* The wording on the pay button, built by the popup, which knows the cadence. */
  payLabel: string;
  /* A preview tab: Pay explains itself instead of starting a payment. */
  preview?: boolean;
  name: string;
  email: string;
  billing: Billing | null;
  onBillingChange: (billing: Billing) => void;
  /* The reference is the platform's donation id, shown on the thank-you receipt. */
  onPaid: (status: "succeeded" | "processing", reference?: { donationId: string }) => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState("");
  /* Kept for a retry after a declined card, so one attempt does not start several payments. */
  const [started, setStarted] = useState<StartedDonation | null>(null);
  /* One key for the monthly confirmation, so a retry cannot record the plan twice. */
  const finalizeKey = useRef("");
  /* Cloudflare's token. The platform checks it before it starts the payment. */
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);

  async function pay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /* Checked before anything else, so a preview needs no card and no address to say so. */
    if (preview) {
      setError("This is a preview. No payment was taken.");
      return;
    }

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    /* Stripe's address fields are separate, so they are checked here rather than by the form. */
    if (!billing?.complete) {
      setError("Add your billing address to continue.");
      return;
    }

    /* Pay waits for Cloudflare's token, so no payment is ever started without the check. */
    if (!preview && TURNSTILE_ENABLED && turnstileToken.length === 0) {
      setError("Please wait for the security check to finish.");
      return;
    }

    setIsPaying(true);
    setError("");

    try {
      /*
        The payment is started on this press, not when the screen opened, so a donor who never
        presses Pay leaves nothing behind. A retry after a decline reuses what came back.
      */
      let current = started;

      if (!current) {
        try {
          current = await resolvePayment(turnstileToken);
        } catch (caught) {
          /* A token works once, so a retry after a failed start needs a fresh one. */
          setTurnstileToken("");
          setTurnstileReset((value) => value + 1);
          throw caught;
        }

        setStarted(current);
      }

      const paymentMethod = {
        card,
        billing_details: {
          name: name.length > 0 ? name : undefined,
          email: email.length > 0 ? email : undefined,
          address: billing?.value.address,
        },
      };

      if (isMonthly) {
        const setup = await stripe.confirmCardSetup(current.clientSecret, { payment_method: paymentMethod });

        if (setup.error) {
          setError(setup.error.message ?? "The card could not be saved.");
          return;
        }

        if (!current.setupIntentId || !current.pendingSessionId) {
          setError("The monthly gift could not be set up. Please try again.");
          return;
        }

        if (finalizeKey.current.length === 0) finalizeKey.current = newPaymentKey();

        await finalizeDonation(
          {
            paymentMode: "split",
            pendingSessionId: current.pendingSessionId,
            setupIntentId: current.setupIntentId,
          },
          finalizeKey.current,
        );

        /* The plan is recorded. The first payment is taken on its own date, which is today. */
        onPaid("succeeded", { donationId: current.donationId });
        return;
      }

      const result = await stripe.confirmCardPayment(current.clientSecret, { payment_method: paymentMethod });

      if (result.error) {
        setError(result.error.message ?? "The payment could not be completed.");
        return;
      }

      const status = result.paymentIntent?.status;

      /*
        "processing" settles later (some cards do this). It is not a failure, so the donor still
        gets thanked; Stripe's receipt is what confirms the final outcome.
      */
      if (status === "succeeded" || status === "processing") {
        onPaid(status, { donationId: current.donationId });
        return;
      }

      setError("The payment was not completed. Please check your card and try again.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The payment could not be started.");
    } finally {
      setIsPaying(false);
    }
  }

  return (
    <form onSubmit={(event) => void pay(event)} className="mt-5 flex flex-col gap-4">
      <div className="text-[0.8125rem] text-body">
        <p>Card details</p>
        <span className="mt-2 block rounded-md border border-line bg-surface px-3 py-3 focus-within:border-action">
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: "15px",
                  color: "#0a0a0a",
                  fontFamily: "inherit",
                  "::placeholder": { color: "#8a8a8a" },
                },
                invalid: { color: "#e32226", iconColor: "#e32226" },
              },
            }}
          />
        </span>
      </div>

      {/*
        Stripe's own address fields: line 1 and line 2, city, state, postal code and country, with
        autocomplete. Its name field is filled in from the popup's own, so it is never typed twice.
        Coming back to this screen keeps what was typed, because the popup holds the address.
      */}
      <div className="text-[0.8125rem] text-body">
        <AddressElement
          options={{
            mode: "billing",
            /*
              Suggestions while line 1 is typed, filling in the city, state and postal code when
              one is picked. Stripe keeps this off unless it is asked for, which is why nothing was
              being suggested. If it stays quiet in your country, the other mode is
              { mode: "google_maps_api", apiKey: "..." }, using your own Google Places key.
            */
            autocomplete: { mode: "automatic" },
            /*
              The Address Element gives no way to hide or lock its name field: Stripe's own note on
              the issue says the name cannot be suppressed there, and only the Payment Element
              supports that. So the field shows, pre-filled from the name the popup already asked
              for. It is for display only — the payment carries the name from the popup's own
              fields, sent as billing_details, so a change here is discarded.
            */
            fields: { name: "never" },
            defaultValues: {
              name,
              ...(billing ? { address: billing.value.address } : {}),
            },
          }}
          onChange={(event) => onBillingChange({ value: event.value, complete: event.complete })}
        />
      </div>

      {/* The preview takes no payment, so it needs no check. */}
      {preview ? null : (
        <TurnstileBox onToken={setTurnstileToken} resetKey={turnstileReset} className="mt-1" />
      )}

      {error.length > 0 ? (
        <p role="alert" className="text-[0.8125rem] text-action">
          {error}
        </p>
      ) : null}

      {/* Back takes only the width it needs, so the pay button has room for "Donate $X/Month". */}
      <div className="donate-actions mt-3">
        <div className="grid grid-cols-[auto_1fr] gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={isPaying}
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-line bg-surface px-6 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-page disabled:opacity-60 max-sm:min-h-11 max-sm:px-4"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={
              !stripe || isPaying || (!preview && TURNSTILE_ENABLED && turnstileToken.length === 0)
            }
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-action px-3 text-[0.9375rem] font-semibold whitespace-nowrap text-white transition-colors hover:bg-action-hover disabled:pointer-events-none disabled:opacity-60 max-sm:min-h-11"
          >
            {isPaying ? "Processing..." : payLabel}
          </button>
        </div>

        <p className="mt-3 text-center text-[0.75rem] text-body">
          Payments are handled securely by Stripe.
        </p>
      </div>
    </form>
  );
}

export function CardStep({
  label,
  value,
  feePercent,
  extra,
  causeLabels,
  isMonthly,
  totalLabel,
  stripe,
  billing,
  name,
  email,
  payLabel,
  preview = false,
  resolvePayment,
  onBillingChange,
  onPaid,
  onBack,
}: {
  label: string;
  value: number;
  feePercent: number;
  extra: number;
  /* The chosen causes by name, for the summary below. */
  causeLabels: string[];
  isMonthly: boolean;
  totalLabel: string;
  /* The instance for the platform's default gateway, which the payment is pinned to. */
  stripe: Stripe | Promise<Stripe | null> | null;
  billing: Billing | null;
  name: string;
  email: string;
  payLabel: string;
  /* A preview tab: Pay explains itself instead of starting a payment. */
  preview?: boolean;
  resolvePayment: (turnstileToken: string) => Promise<StartedDonation>;
  onBillingChange: (billing: Billing) => void;
  onPaid: (status: "succeeded" | "processing", reference?: { donationId: string }) => void;
  onBack: () => void;
}) {
  return (
    <>
      <p className="mt-4 text-[0.8125rem] text-body">
        You are donating to <span className="font-semibold text-ink">{label}</span>.
      </p>

      {/* What the charge is made of, so it can be read over before the card is entered. */}
      <dl className="mt-4 flex flex-col gap-2 rounded-lg border border-line bg-page px-4 py-3 text-[0.8125rem]">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-body">Donation amount</dt>
          <dd className="font-semibold text-ink">
            {money(value)}
            {isMonthly ? " / month" : ""}
          </dd>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-body">{feePercent > 0 ? `Fees (${feePercent}%)` : "Fees"}</dt>
          <dd className="font-semibold text-ink">{money(extra)}</dd>
        </div>

        {causeLabels.length > 0 ? (
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-body">Causes</dt>
            <dd className="max-w-[65%] text-right font-semibold text-ink">
              {causeLabels.join(", ")}
            </dd>
          </div>
        ) : null}

        {/*
          A monthly gift runs for a fixed number of payments, not until the donor stops it, so the
          term is said here. The popup carries that number; the platform bills that many dates.
        */}
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-body">Donation type</dt>
          <dd className="font-semibold text-ink">
            {isMonthly ? `Monthly · ${MONTHLY_TERM} payments` : "One-time"}
          </dd>
        </div>

        <div className="mt-1 flex items-baseline justify-between gap-4 border-t border-divider pt-2">
          <dt className="font-semibold text-ink">{isMonthly ? "Charged each month" : "Total charged"}</dt>
          <dd className="text-[1rem] font-semibold text-action">{totalLabel}</dd>
        </div>
      </dl>

      <Elements stripe={stripe} options={stripeLook}>
        <CardFields
          resolvePayment={resolvePayment}
          isMonthly={isMonthly}
          payLabel={payLabel}
          preview={preview}
          name={name}
          email={email}
          billing={billing}
          onBillingChange={onBillingChange}
          onPaid={onPaid}
          onBack={onBack}
        />
      </Elements>
    </>
  );
}
