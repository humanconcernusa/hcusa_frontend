"use client";

import { useEffect, useRef, useState } from "react";
import { PaymentRequestButtonElement, useStripe } from "@stripe/react-stripe-js";
import type { PaymentRequest } from "@stripe/stripe-js";
import { TURNSTILE_ENABLED } from "@/turnstile";
import { TurnstileBox } from "@/components/turnstile/turnstile-box";
import { finalizeDonation, newPaymentKey, type StartedDonation } from "@/donation-payments";
import type { DonationAddress } from "./hero-parts";

/*
  Google Pay for the hero popup.

  The wallet is chosen before the card fields are shown. Google Pay returns the payer's billing
  address, and the platform needs an address BEFORE it will create a payment. So this uses Stripe's
  Payment Request button, which hands us the wallet's address first. The newer Express Checkout
  element needs the payment secret before it can confirm, which we cannot get without an address.

  The money path is the same as the card: submitDonation creates the payment, then the wallet's
  payment method is confirmed against it. Monthly saves the card and records the plan.
*/
export function GooglePayOption({
  total,
  isMonthly,
  preview = false,
  resolvePayment,
  onPaid,
  onBack,
}: {
  total: number;
  isMonthly: boolean;
  preview?: boolean;
  resolvePayment: (turnstileToken: string, address?: DonationAddress) => Promise<StartedDonation>;
  onPaid: (status: "succeeded" | "processing", reference?: { donationId: string }) => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);

  const startedRef = useRef<StartedDonation | null>(null);
  const resolveRef = useRef(resolvePayment);
  const onPaidRef = useRef(onPaid);
  const tokenRef = useRef(turnstileToken);
  const previewRef = useRef(preview);
  const finalizeKey = useRef("");

  useEffect(() => { resolveRef.current = resolvePayment; }, [resolvePayment]);
  useEffect(() => { onPaidRef.current = onPaid; }, [onPaid]);
  useEffect(() => { tokenRef.current = turnstileToken; }, [turnstileToken]);
  useEffect(() => { previewRef.current = preview; }, [preview]);

  useEffect(() => {
    if (!stripe || total <= 0) return undefined;

    const request = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: isMonthly ? "Monthly donation" : "Donation",
        amount: Math.round(total * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
      /* Only Google Pay. Apple Pay, Link and browser-saved cards are left out. */
      disableWallets: ["applePay", "link", "browserCard"],
    });

    let active = true;
    void request.canMakePayment().then((result) => {
      if (active) setAvailable(Boolean(result));
    });

    request.on("paymentmethod", async (event) => {
      if (previewRef.current) {
        event.complete("fail");
        setError("This is a preview. No payment was taken.");
        return;
      }

      if (TURNSTILE_ENABLED && tokenRef.current.length === 0) {
        event.complete("fail");
        setError("Please wait for the security check to finish.");
        return;
      }

      setIsPaying(true);
      setError("");

      try {
        let current = startedRef.current;

        if (!current) {
          const address = event.paymentMethod.billing_details.address;
          current = await resolveRef.current(tokenRef.current, {
            addressLine1: address?.line1 ?? "",
            streetName: address?.line2 || address?.line1 || "",
            city: address?.city ?? "",
            state: address?.state ?? "",
            postalCode: address?.postal_code ?? "",
            country: address?.country ?? "",
          });
          startedRef.current = current;
        }

        if (isMonthly) {
          const setup = await stripe.confirmCardSetup(current.clientSecret, {
            payment_method: event.paymentMethod.id,
          });

          if (setup.error) {
            event.complete("fail");
            setError(setup.error.message ?? "The card could not be saved.");
            return;
          }

          if (!current.setupIntentId || !current.pendingSessionId) {
            event.complete("fail");
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

          event.complete("success");
          onPaidRef.current("succeeded", { donationId: current.donationId });
          return;
        }

        const result = await stripe.confirmCardPayment(current.clientSecret, {
          payment_method: event.paymentMethod.id,
        });

        if (result.error) {
          event.complete("fail");
          setError(result.error.message ?? "The payment could not be completed.");
          return;
        }

        const status = result.paymentIntent?.status;

        if (status === "succeeded" || status === "processing") {
          event.complete("success");
          onPaidRef.current(status, { donationId: current.donationId });
          return;
        }

        event.complete("fail");
        setError("The payment was not completed. Please try again.");
      } catch (caught) {
        event.complete("fail");
        setError(caught instanceof Error ? caught.message : "The payment could not be started.");
        setTurnstileToken("");
        setTurnstileReset((value) => value + 1);
      } finally {
        setIsPaying(false);
      }
    });

    setPaymentRequest(request);

    return () => {
      active = false;
    };
  }, [stripe, total, isMonthly]);

  const ready = !TURNSTILE_ENABLED || turnstileToken.length > 0;

  return (
    <div className="mt-5 flex flex-col gap-4">
      <p className="text-[0.8125rem] text-body">
        {isMonthly
          ? "Google Pay saves the card and starts the monthly plan. The first payment is taken today."
          : "Pay with a card saved in Google Pay."}
      </p>

      <TurnstileBox onToken={setTurnstileToken} resetKey={turnstileReset} />

      {preview ? (
        <p className="text-[0.8125rem] text-body">This is a preview. No payment was taken.</p>
      ) : available === null ? (
        <p className="text-[0.8125rem] text-body">Checking Google Pay…</p>
      ) : available === false ? (
        <p className="text-[0.8125rem] text-action">
          Google Pay is not available on this browser or in this region. Use the card option instead.
        </p>
      ) : !ready ? (
        <p className="text-[0.8125rem] text-body">Complete the security check to continue.</p>
      ) : paymentRequest ? (
        <PaymentRequestButtonElement
          options={{
            paymentRequest,
            style: { paymentRequestButton: { theme: "dark", height: "48px" } },
          }}
        />
      ) : null}

      {isPaying ? <p className="text-[0.8125rem] text-body">Processing…</p> : null}

      {error.length > 0 ? (
        <p role="alert" className="text-[0.8125rem] text-action">
          {error}
        </p>
      ) : null}

      <div className="donate-actions mt-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isPaying}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-line bg-surface px-6 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-page disabled:opacity-60 max-sm:min-h-11 max-sm:px-4"
        >
          Back
        </button>
      </div>
    </div>
  );
}
