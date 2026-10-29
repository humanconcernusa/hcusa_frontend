"use client";

import { useEffect, useRef, useState } from "react";
import {
  Elements,
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { Stripe, StripeExpressCheckoutElementConfirmEvent } from "@stripe/stripe-js";
import { TURNSTILE_ENABLED } from "@/turnstile";
import { TurnstileBox } from "@/components/turnstile/turnstile-box";
import {
  finalizeDonation,
  type CompleteDonationBody,
  type StartedDonation,
} from "@/donation-payments";
import { stripeLook } from "@/stripe-key";

/*
  Google Pay for the hero popup.

  The flow is split in two, because our platform needs the donor address to create the donation,
  while Google Pay collects that address inside the wallet.

  1. startPayment creates the Stripe payment with the amount only. No address.
  2. Stripe's Express Checkout element draws the Google Pay button.
  3. Google Pay collects the card and the billing address.
  4. completePayment sends the wallet's address to the donation that was started in step 1.
  5. Stripe confirms the payment or the SetupIntent.

  The Express Checkout element is Stripe's modern wallet element. The old Payment Request button
  is why Google Pay kept reporting "not available" even when the browser had it.
*/
export function GooglePayOption({
  stripe,
  isMonthly,
  preview = false,
  firstName,
  lastName,
  email,
  organization,
  startPayment,
  completePayment,
  onPaid,
  onBack,
}: {
  stripe: Stripe;
  isMonthly: boolean;
  preview?: boolean;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  startPayment: (turnstileToken: string) => Promise<StartedDonation>;
  completePayment: (payload: CompleteDonationBody) => Promise<void>;
  onPaid: (status: "succeeded" | "processing", reference?: { donationId: string }) => void;
  onBack: () => void;
}) {
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [started, setStarted] = useState<StartedDonation | null>(null);
  const [error, setError] = useState("");
  const startRef = useRef(startPayment);
  const startedRef = useRef(false);

  useEffect(() => {
    startRef.current = startPayment;
  }, [startPayment]);

  const ready = !TURNSTILE_ENABLED || turnstileToken.length > 0;

  useEffect(() => {
    if (preview || !ready || startedRef.current) return undefined;
    startedRef.current = true;
    let active = true;

    startRef
      .current(turnstileToken)
      .then((value) => {
        if (active) setStarted(value);
      })
      .catch((caught) => {
        if (!active) return;
        startedRef.current = false;
        setError(caught instanceof Error ? caught.message : "The payment could not be started.");
        setTurnstileToken("");
        setTurnstileReset((value) => value + 1);
      });

    return () => {
      active = false;
    };
  }, [preview, ready, turnstileToken]);

  return (
    <div className="mt-5 flex flex-col gap-3">
      <p className="text-[0.8125rem] text-body">
        {isMonthly
          ? "Google Pay saves the card and starts the monthly plan. The first payment is taken today."
          : "Pay with a card saved in Google Pay."}
      </p>

      <TurnstileBox onToken={setTurnstileToken} resetKey={turnstileReset} />

      {preview ? (
        <p className="text-[0.8125rem] text-body">This is a preview. No payment was taken.</p>
      ) : !ready ? (
        <p className="text-[0.8125rem] text-body">Complete the security check to continue.</p>
      ) : !started ? (
        <p className="text-[0.8125rem] text-body">Preparing Google Pay…</p>
      ) : (
        <Elements
          stripe={stripe}
          options={{ clientSecret: started.clientSecret, appearance: stripeLook.appearance }}
        >
          <GooglePayButtons
            isMonthly={isMonthly}
            firstName={firstName}
            lastName={lastName}
            email={email}
            organization={organization}
            started={started}
            completePayment={completePayment}
            onPaid={onPaid}
            onError={(message) => {
              setError(message);
              setTurnstileToken("");
              setTurnstileReset((value) => value + 1);
            }}
          />
        </Elements>
      )}

      {error.length > 0 ? (
        <p role="alert" className="text-[0.8125rem] text-action">
          {error}
        </p>
      ) : null}

      <div className="donate-actions mt-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-line bg-surface px-6 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-page max-sm:min-h-11 max-sm:px-4"
        >
          Back
        </button>
      </div>
    </div>
  );
}

function GooglePayButtons({
  isMonthly,
  firstName,
  lastName,
  email,
  organization,
  started,
  completePayment,
  onPaid,
  onError,
}: {
  isMonthly: boolean;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  started: StartedDonation;
  completePayment: (payload: CompleteDonationBody) => Promise<void>;
  onPaid: (status: "succeeded" | "processing", reference?: { donationId: string }) => void;
  onError: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [available, setAvailable] = useState<boolean | null>(null);
  const [isPaying, setIsPaying] = useState(false);

  async function confirm(event: StripeExpressCheckoutElementConfirmEvent) {
    if (!stripe || !elements || isPaying) return;

    const address = event.billingDetails?.address;
    const info = {
      firstName,
      lastName,
      email,
      ...(organization.trim().length > 0 ? { organization: organization.trim() } : {}),
      addressLine1: address?.line1 ?? "",
      streetName: address?.line2 || address?.line1 || "",
      city: address?.city ?? "",
      state: address?.state ?? "",
      postalCode: address?.postal_code ?? "",
      country: address?.country ?? "",
    };

    if (!info.addressLine1 || !info.city || !info.country) {
      const message = "Google Pay did not return a full billing address. Please use the card option.";
      event.paymentFailed({ reason: "invalid_billing_address", message });
      onError(message);
      return;
    }

    setIsPaying(true);

    try {
      /* Save the wallet's details on the donation before the charge is made. */
      await completePayment({
        donationId: started.donationId,
        info,
        paymentIntentId: started.paymentIntentId,
        setupIntentId: started.setupIntentId,
        pendingSessionId: started.pendingSessionId,
      });

      const returnUrl = typeof window !== "undefined" ? window.location.href : "";

      if (isMonthly) {
        const setup = await stripe.confirmSetup({
          elements,
          clientSecret: started.clientSecret,
          confirmParams: { return_url: returnUrl },
          redirect: "if_required",
        });

        if (setup.error) {
          const message = setup.error.message ?? "The card could not be saved.";
          event.paymentFailed({ message });
          onError(message);
          return;
        }

        if (!started.pendingSessionId || !started.setupIntentId) {
          const message = "The monthly gift could not be set up. Please try again.";
          event.paymentFailed({ message });
          onError(message);
          return;
        }

        await finalizeDonation(
          {
            paymentMode: "split",
            pendingSessionId: started.pendingSessionId,
            setupIntentId: started.setupIntentId,
          },
          `${started.donationId}-finalize`,
        );

        onPaid("succeeded", { donationId: started.donationId });
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        clientSecret: started.clientSecret,
        confirmParams: { return_url: returnUrl },
        redirect: "if_required",
      });

      if (result.error) {
        const message = result.error.message ?? "The payment could not be completed.";
        event.paymentFailed({ message });
        onError(message);
        return;
      }

      const status = result.paymentIntent?.status === "processing" ? "processing" : "succeeded";
      onPaid(status, { donationId: started.donationId });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "The payment could not be completed.";
      event.paymentFailed({ message });
      onError(message);
    } finally {
      setIsPaying(false);
    }
  }

  return (
    <>
      <ExpressCheckoutElement
        options={{
          paymentMethods: { googlePay: "always", applePay: "never", link: "never" },
          buttonHeight: 48,
        }}
        onReady={(event) => setAvailable(Boolean(event.availablePaymentMethods?.googlePay))}
        onConfirm={(event) => void confirm(event)}
      />

      {available === false ? (
        <p className="text-[0.8125rem] text-action">
          Google Pay is not available on this browser. Use the card option instead.
        </p>
      ) : null}

      {isPaying ? <p className="text-[0.8125rem] text-body">Processing…</p> : null}
    </>
  );
}
